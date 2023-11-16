// @ts-check
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as mod from '../src';

const fn = mod.default;

test('exports', () => {
	assert.type(mod.default, 'function', 'exports default function');
	assert.type(mod.cs, 'function', 'exports named function');
	assert.is(mod.default, mod.cs, 'exports are equal');

	assert.type(mod.default(), 'string', '~> returns string output');
	assert.type(mod.cs(), 'string', '~> returns string output');
});

test('strings', () => {
	// @ts-ignore
	assert.is(fn(''), '');
	// @ts-ignore
	assert.is(fn('foo'), 'foo');
	// @ts-ignore
	assert.is(fn(true && 'foo'), 'foo');
	// @ts-ignore
	assert.is(fn(false && 'foo'), '');
});

test('strings (variadic)', () => {
	// @ts-ignore
	assert.is(fn(''), '');
	// @ts-ignore
	assert.is(fn('foo', 'bar'), 'foo bar');
	// @ts-ignore
	assert.is(fn(true && 'foo', false && 'bar', 'baz'), 'foo baz');
	// @ts-ignore
	assert.is(fn(false && 'foo', 'bar', 'baz', ''), 'bar baz');
});

test('numbers', () => {
	// @ts-ignore
	assert.is(fn(1), '1');
	// @ts-ignore
	assert.is(fn(12), '12');
	// @ts-ignore
	assert.is(fn(0.1), '0.1');
	// @ts-ignore
	assert.is(fn(0), '');

	// @ts-ignore
	assert.is(fn(Infinity), 'Infinity');
	// @ts-ignore
	assert.is(fn(NaN), '');
});

test('numbers (variadic)', () => {
	// @ts-ignore
	assert.is(fn(0, 1), '1');
	// @ts-ignore
	assert.is(fn(1, 2), '1 2');
});

test('objects', () => {
	// @ts-ignore
	assert.is(fn({}), '');
	// @ts-ignore
	assert.is(fn({ foo: true }), 'foo');
	// @ts-ignore
	assert.is(fn({ foo: true, bar: false }), 'foo');
	// @ts-ignore
	assert.is(fn({ foo: 'hiya', bar: 1 }), 'foo bar');
	// @ts-ignore
	assert.is(fn({ foo: 1, bar: 0, baz: 1 }), 'foo baz');
	// @ts-ignore
	assert.is(fn({ '-foo': 1, '--bar': 1 }), '-foo --bar');
});

test('objects (variadic)', () => {
	// @ts-ignore
	assert.is(fn({}, {}), '');
	// @ts-ignore
	assert.is(fn({ foo: 1 }, { bar: 2 }), 'foo bar');
	// @ts-ignore
	assert.is(fn({ foo: 1 }, null, { baz: 1, bat: 0 }), 'foo baz');
	// @ts-ignore
	assert.is(fn({ foo: 1 }, {}, {}, { bar: 'a' }, { baz: null, bat: Infinity }), 'foo bar bat');
});

test('arrays', () => {
	// @ts-ignore
	assert.is(fn([]), '');
	// @ts-ignore
	assert.is(fn(['foo']), 'foo');
	// @ts-ignore
	assert.is(fn(['foo', 'bar']), 'foo bar');
	// @ts-ignore
	assert.is(fn(['foo', 0 && 'bar', 1 && 'baz']), 'foo baz');
});

test('arrays (nested)', () => {
	// @ts-ignore
	assert.is(fn([[[]]]), '');
	// @ts-ignore
	assert.is(fn([[['foo']]]), 'foo');
	// @ts-ignore
	assert.is(fn([true, [['foo']]]), 'foo');;
	// @ts-ignore
	assert.is(fn(['foo', ['bar', ['', [['baz']]]]]), 'foo bar baz');
});

test('arrays (variadic)', () => {
	// @ts-ignore
	assert.is(fn([], []), '');
	// @ts-ignore
	assert.is(fn(['foo'], ['bar']), 'foo bar');
	// @ts-ignore
	assert.is(fn(['foo'], null, ['baz', ''], true, '', []), 'foo baz');
});

test('arrays (no `push` escape)', () => {
	// @ts-ignore
	assert.is(fn({ push: 1 }), 'push');
	// @ts-ignore
	assert.is(fn({ pop: true }), 'pop');
	// @ts-ignore
	assert.is(fn({ push: true }), 'push');
	// @ts-ignore
	assert.is(fn('hello', { world: 1, push: true }), 'hello world push');
});

test('functions', () => {
	const foo = () => { };
	// @ts-ignore
	assert.is(fn(foo, 'hello'), 'hello');
	// @ts-ignore
	assert.is(fn(foo, 'hello', fn), 'hello');
	// @ts-ignore
	assert.is(fn(foo, 'hello', [[fn], 'world']), 'hello world');
});

test('apply styles with prefix 1', () => {
	// @ts-ignore
	assert.is(fn('flex', { prefix: 'hover:', style: 'bg-green-700 text-white rounded' }), 'flex hover:bg-green-700 hover:text-white hover:rounded');
});

test('apply styles with prefix 2', () => {
	// @ts-ignore
	assert.is(fn({ prefix: 'hover:', style: ['bg-green-700', 'text-white'] }), 'hover:bg-green-700 hover:text-white');
});

test('apply styles with prefix conditionally 3', () => {
	assert.is(fn(
		// @ts-ignore
		{ prefix: 'hover:', style: [true && 'bg-green-700', { 'text-white': false }] },
		{ prefix: 'hover:', style: { 'text-white': true } }),
		'hover:bg-green-700 hover:text-white');
});

test('apply styles with prefix avoiding props 4', () => {
	// @ts-ignore
	assert.is(fn([{ prefix: 'hover:', style: 'bg-green-700' }, 'a'], { prefix: 'hover:', style: 'text-white', props: ['s', {}, []] }), 'hover:bg-green-700 a hover:text-white');
});

test.run();
