import championsData from '../assets/data/champions.json';
import { db } from './db';

export const importData = async () => {
    // Check if data already exists to avoid re-importing
    const countRes = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM champions');
    if (countRes && countRes.count > 0) {
        console.log('Data already imported');
        return;
    }

    console.log('Starting import...');

    await db.withTransactionAsync(async () => {
        for (const champ of (championsData as any[])) {
            await db.runAsync(
                'INSERT INTO champions (id, name, alias, description, squarePortraitPath) VALUES (?, ?, ?, ?, ?)',
                [champ.id, champ.name, champ.alias, champ.description, champ.squarePortraitPath]
            );

            if (champ.skins) {
                for (const skin of champ.skins) {
                    await db.runAsync(
                        'INSERT INTO skins (id, champion_id, name, rarity, is_legacy, splashPath, tilePath, loadScreenPath, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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

    console.log('Import finished');
};
