export const postedDataValidator = (data: any) => {
    const actualKeys = ['username', 'age', 'hobbies'];
    const keys = Object.keys(data);

    let isDefined = true;

    if(actualKeys.length !== keys.length)
        isDefined = false;

    keys.map(key => {
        if (!actualKeys.includes(key))
            isDefined = false;
    });

    const text = isDefined ? 'Proper' : 'Wrong';

    return {
        isValidate: isDefined,
        message: `${text} properties!`
    };
};