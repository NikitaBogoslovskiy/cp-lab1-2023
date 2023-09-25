import {Cache} from "../src/cache";

test('1. Check key validation as string during object adding', () => {
    let cache = new Cache();
    expect(()=> { cache.add(5, '50000$', 1); }).toThrow(new TypeError('Key must be string'));
});

test('2. Check frequency validation as number during object adding', () => {
    let cache = new Cache();
    expect(()=> { cache.add('car', '50000$', false); }).toThrow(new TypeError('Frequency must be number'));
});

test('3. Check frequency validation as non-negative number during object adding', () => {
    let cache = new Cache();
    expect(()=> { cache.add('car', '50000$', -5); }).toThrow(new Error('Frequency must be equal or greater 0'));
});

test('4. Check frequency validation as integer number during object adding', () => {
    let cache = new Cache();
    expect(()=> { cache.add('car', '50000$', 2.3); }).toThrow(new Error('Frequency must be integer number'));
});

test('5. Check key validation as string during getting object value', () => {
    let cache = new Cache();
    cache.add('125', 50, 3);
    expect(()=> { cache.get_value(125); }).toThrow(new TypeError('Key must be string'));
});

test('6. Check key validation as string during getting object frequency', () => {
    let cache = new Cache();
    cache.add('125', 50, 3);
    expect(()=> { cache.get_freq(125); }).toThrow(new TypeError('Key must be string'));
});


test('7. Check getting value function when value is a string', () => {
    let cache = new Cache();
    cache.add('car', '50000$', 1);
    let car_price = cache.get_value('car');
    expect(car_price).toBe('50000$');
});

test('8. Check getting value function when value is a number', () => {
    let cache = new Cache();
    cache.add('laptop', 1000, 8);
    let laptop_price = cache.get_value('laptop');
    expect(laptop_price).toBe(1000);
});

test('9. Check getting value function when value is a boolean', () => {
    let cache = new Cache();
    cache.add('is cool', true, 5);
    let is_cool = cache.get_value('is cool');
    expect(is_cool).toBe(true);
});

test('10. Check getting frequency function when object was added without specific frequency', () => {
    let cache = new Cache();
    cache.add('car', '50000$');
    let car_freq = cache.get_freq('car');
    expect(car_freq).toBe(1);
});

test('11. Check getting frequency function when object was added with specific frequency', () => {
    let cache = new Cache();
    cache.add('car', '50000$', 10);
    let car_freq = cache.get_freq('car');
    expect(car_freq).toBe(10);
});

test('12. Check frequency decrease after calling getting value function', () => {
    let cache = new Cache();
    cache.add('car', '50000$', 10);
    cache.get_value('car');
    let car_freq = cache.get_freq('car');
    expect(car_freq).toBe(9);
});

test('13. Check frequency decrease after calling getting value function when frequency was 1 and becomes 0', () => {
    let cache = new Cache();
    cache.add('car', '50000$', 1);
    cache.get_value('car');
    let car_freq = cache.get_freq('car');
    expect(car_freq).toBe(0);
});

test('14. Check getting value function when object frequency is defined as 0', () => {
    let cache = new Cache();
    cache.add('car', '50000$', 0);
    let car_price = cache.get_value('car');
    expect(car_price).toBe(null);
});

test('15. Check getting value function when object frequency is 0 after calls of getting value function', () => {
    let cache = new Cache();
    cache.add('car', '50000$', 1);
    let car_price = cache.get_value('car');
    car_price = cache.get_value('car');
    expect(car_price).toBe(null);
});

test('16. Check getting value function when key is unknown', () => {
    let cache = new Cache();
    let car_price = cache.get_value('car');
    expect(car_price).toBe(null);
});

test('17. Check getting frequency function when key is unknown', () => {
    let cache = new Cache();
    let car_freq = cache.get_freq('car');
    expect(car_freq).toBe(null);
});

test('18. Check getting statistics function after working with one object', () => {
    let cache = new Cache();
    cache.add('car', '50000$', 3);
    cache.get_value('car');
    cache.get_value('car');
    cache.get_freq('car');
    cache.get_value('car');
    cache.get_value('car');
    let actual_stats_string = cache.get_stats();
    let true_stats_string = [`New key was added. Key: 'car', value: '50000$', remaining requests number: 3`,
                             `Value was requested by key. Key: 'car', value: '50000$', remaining requests number: 2`,
                             `Value was requested by key. Key: 'car', value: '50000$', remaining requests number: 1`,
                             `Remaining requests number was requested by key. Key: 'car', value: '50000$', remaining requests number: 1`,
                             `Value was requested by key. Key: 'car', value: '50000$', remaining requests number: 0`,
                             `Value was requested by key. Key: 'car', value: '50000$', remaining requests number: 0`].join('\n');
    expect(actual_stats_string).toBe(true_stats_string);
});

test('19. Check getting statistics function after working with two objects', () => {
    let cache = new Cache();
    cache.add('laptop', '1000$', 2);
    cache.get_value('laptop');
    cache.add('is_cool', true, 3);
    cache.get_freq('is_cool');
    cache.get_value('is_cool');
    cache.get_freq('laptop');
    cache.get_value('is_cool');
    cache.get_value('is_cool');
    let actual_stats_string = cache.get_stats();
    let true_stats_string = [`New key was added. Key: 'laptop', value: '1000$', remaining requests number: 2`,
                             `Value was requested by key. Key: 'laptop', value: '1000$', remaining requests number: 1`,
                             `New key was added. Key: 'is_cool', value: 'true', remaining requests number: 3`,
                             `Remaining requests number was requested by key. Key: 'is_cool', value: 'true', remaining requests number: 3`,
                             `Value was requested by key. Key: 'is_cool', value: 'true', remaining requests number: 2`,
                             `Remaining requests number was requested by key. Key: 'laptop', value: '1000$', remaining requests number: 1`,
                             `Value was requested by key. Key: 'is_cool', value: 'true', remaining requests number: 1`,
                             `Value was requested by key. Key: 'is_cool', value: 'true', remaining requests number: 0`].join('\n');
    expect(actual_stats_string).toBe(true_stats_string);
});