export default function(str) {
	let value = str.toString();
	const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];

	for (let i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
		value = value.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
	}
	return value;
};
