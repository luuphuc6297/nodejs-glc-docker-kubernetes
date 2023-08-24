
/**
* Create user
* @object {*} userDto
*/
exports.createUser = (userDto) => {
    // Default client
    const client = { ip: '::1', agent: 'PostmanRuntime/7.26.5' };
    return AuthService.register({ user: userDto, client });
};
