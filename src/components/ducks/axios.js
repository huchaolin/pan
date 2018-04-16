import axios from 'axios';
import { message} from 'antd';

const defaullConfig = {
    withCredentials: true
}

const midleware = {
    post: (path, data = {}, config = defaullConfig) => {
        const req = axios.post(path, data, config);
        return req.then(function(data) {
            if (data.success === false) {
                message.error(data.message);
                return Promise.reject(data.message);
            }
            if (data.redirection) {
              //  asdasd
            }
            return req;
        });
    }
}

export default midleware;
