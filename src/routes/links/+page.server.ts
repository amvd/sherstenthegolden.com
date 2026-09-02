import QRCode from 'qrcode';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const qrSvg = await QRCode.toString('https://sherstenthegolden.com/links', {
			type: 'svg',
			margin: 1,
			color: {
				dark: '#0b1a28',
				light: '#eff0e0'
			}
		});

		return {
			qrSvg
		};
	} catch (err) {
		console.error('Failed to generate SSR QR code', err);
		return {
			qrSvg: ''
		};
	}
};
