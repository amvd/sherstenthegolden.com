import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const sourceImage = fs.existsSync(path.resolve('src/lib/assets/profile/main.jpg'))
	? path.resolve('src/lib/assets/profile/main.jpg')
	: path.resolve('src/lib/assets/images/main.jpg');
const staticDir = path.resolve('static');

async function generateMetaAssets() {
	if (!fs.existsSync(sourceImage)) {
		console.warn(`[meta-gen] Source image ${sourceImage} not found. Skipping.`);
		return;
	}

	if (!fs.existsSync(staticDir)) {
		fs.mkdirSync(staticDir, { recursive: true });
	}

	console.log('[meta-gen] Generating favicons and social meta images from main.jpg...');

	// 1. Favicon standard root favicon.ico (encoded as standard 32x32 PNG icon file)
	await sharp(sourceImage)
		.resize(32, 32, { fit: 'cover', position: 'center' })
		.png()
		.toFile(path.join(staticDir, 'favicon.ico'));

	// 2. Favicon PNG (32x32)
	await sharp(sourceImage)
		.resize(32, 32, { fit: 'cover', position: 'center' })
		.png({ compressionLevel: 9 })
		.toFile(path.join(staticDir, 'favicon.png'));

	// 3. Favicon PNG (48x48)
	await sharp(sourceImage)
		.resize(48, 48, { fit: 'cover', position: 'center' })
		.png()
		.toFile(path.join(staticDir, 'favicon-48x48.png'));

	// 4. Apple Touch Icon (180x180)
	await sharp(sourceImage)
		.resize(180, 180, { fit: 'cover', position: 'center' })
		.png({ quality: 90 })
		.toFile(path.join(staticDir, 'apple-touch-icon.png'));

	// 5. OpenGraph Social Card (1200x630)
	await sharp(sourceImage)
		.resize(1200, 630, { fit: 'cover', position: 'center' })
		.jpeg({ quality: 88, mozjpeg: true })
		.toFile(path.join(staticDir, 'og-image.jpg'));

	// 6. Web App Icons
	await sharp(sourceImage)
		.resize(192, 192, { fit: 'cover', position: 'center' })
		.png()
		.toFile(path.join(staticDir, 'icon-192.png'));

	await sharp(sourceImage)
		.resize(512, 512, { fit: 'cover', position: 'center' })
		.png()
		.toFile(path.join(staticDir, 'icon-512.png'));

	console.log('[meta-gen] Successfully generated favicons (including favicon.ico), apple-touch-icon, and og-image.jpg');
}

generateMetaAssets().catch((err) => {
	console.error('[meta-gen] Error generating meta assets:', err);
	process.exit(1);
});
