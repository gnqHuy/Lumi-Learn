module.exports = function (api) {
	api.cache(false);
	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
			'module:metro-react-native-babel-preset',
		],
		plugins: [
			'react-native-reanimated/plugin'
		]
	};
};