import championsData from '../assets/data/champions.json';
import { db } from './db';

export const importData = async () => {
    const jsonChampions = championsData as any[];
    let jsonSkinCount = 0;
    for (const c of jsonChampions) {
        if (c.skins) jsonSkinCount += c.skins.length;
    }

    const dbChampCountRes = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM champions');
    const dbSkinCountRes = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM skins');

    const dbChampCount = dbChampCountRes?.count || 0;
    const dbSkinCount = dbSkinCountRes?.count || 0;

    console.log(`Checking data sync. DB: ${dbChampCount} champs, ${dbSkinCount} skins. JSON: ${jsonChampions.length} champs, ${jsonSkinCount} skins.`);

    if (dbChampCount < jsonChampions.length || dbSkinCount < jsonSkinCount) {
        console.log('New data detected. Syncing...');

        await db.withTransactionAsync(async () => {
            for (const champ of jsonChampions) {
                // Insert Champion (Ignore if exists)
                await db.runAsync(
                    'INSERT OR IGNORE INTO champions (id, name, alias, description, squarePortraitPath) VALUES (?, ?, ?, ?, ?)',
                    [champ.id, champ.name, champ.alias, champ.description, champ.squarePortraitPath]
                );

                if (champ.skins) {
                    for (const skin of champ.skins) {
                        // Insert Skin (Ignore if exists)
                        await db.runAsync(
                            'INSERT OR IGNORE INTO skins (id, champion_id, name, rarity, is_legacy, splashPath, tilePath, loadScreenPath, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [
                                skin.id,
                                champ.id,
                                skin.name,
                                skin.rarity,
                                skin.isLegacy ? 1 : 0,
                                skin.splashPath,
                                skin.tilePath,
                                skin.loadScreenPath,
                                skin.description,
                            ]
                        );
                    }
                }
            }
        });

        const finalChampCount = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM champions');
        const finalSkinCount = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM skins');
        console.log(`Sync complete. DB now has: ${finalChampCount?.count} champs, ${finalSkinCount?.count} skins.`);
    } else {
        console.log('Data is up to date.');
    }
};
