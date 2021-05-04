const message = {};

message.success = (text = '', payload) => {
    const object = {
        message: text,
        success: true,
        fail: false,
        payload,
    };
    return object;
};

message.fail = (text = '', payload) => {
    const object = {
        message: text,
        success: false,
        fail: true,
        payload,
    };

    return object;
};



export default message;
