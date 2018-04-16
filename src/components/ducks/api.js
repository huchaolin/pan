const prefix = 'http://pan.bulibuli.wang/'

let api = {
    createUser:'api/user/create',
    confirmUser: 'auth/login',
    logout: 'api/user/logout',
    upload:  'api/user/upload',
    sts: 'api/sts/get',
    createFile: 'api/file/create',
    download: 'api/file/download',
    file: 'api/file/list',
    delete: 'api/file/delete'
};
for(let i in api) {
    api[i] = prefix + api[i];
    
}
export default api; 
