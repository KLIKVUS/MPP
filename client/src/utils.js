// доставать данные корректно из localstorage
export function parse(type) {
    return typeof type == 'string' ? JSON.parse(type) : type;
}

// удалять элемент из массива
export function remove(arr, item)
{
    var index = arr.indexOf(item);
    return [
         ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ];
}