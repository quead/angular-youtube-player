export interface SettingsModel {
	form_settings: {
		thumbnails: {
			name: string;
			value: boolean;
			visible: boolean;
		};
		listToggle: {
			name: string;
			value: boolean;
			visible: boolean;
		};
		repeat: {
			name: string;
			value: boolean;
			visible: boolean;
		};
	};
	api_settings: {
		key: {
			name: string;
			value: string;
		};
		region: {
			name: string;
			value: string;
		};
		search_num: {
			name: string;
			value: number;
		};
		related_num: {
			name: string;
			value: number;
		};
	};
}
