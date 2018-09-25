const calculator = require('../stringCalculator');

describe('calculator', () => {
	it('default', () => {
		calculator('2323+2*932-4').should.eql(4183);
	})

	it('with spaces', () => {
		calculator('2323 + 2 / 932 - 4').should.eql(2319.002);
	})

	it('with brackets', () => {
		calculator('(2323+2)*932-4').should.eql(2166896);
	})

	it('with two brackets', () => {
		calculator('(2323+2)*(932-4)').should.eql(2157600);
	})

	it('double brackets', () => {
		calculator('2323*(2/932*(24-4))+41').should.eql(140.7);
	})

	it('with floats', () => {
		calculator('2323.4 + 2.24 * 932.87 - 4.01').should.eql(4409.019);
	})

	it('unsuported operator', () => {
		should(() => calculator('2323+2^932-4')).throw('unsupported operator ^');
	})

	it('incorrect count close brackets', () => {
		should(() => calculator('(2323+2)*932)-4')).throw('incorrect sequence of brackets');
	})

	it('incorrect count close brackets', () => {
		should(() => calculator('2323(+2)*932)-4')).throw('incorrect sequence of brackets');
	})

	it('incorrect count open brackets', () => {
		should(() => calculator('(2323+(2*932-4)')).throw('invalid expression');
	})

	it('random bracket', () => {
		should(() => calculator(')2323+2*932-4')).throw('incorrect sequence of brackets');
	})
})
