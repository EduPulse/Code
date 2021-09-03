export default function APIURL(path, params) {
    const APIEnd = `${window.location.protocol}//${window.location.hostname}:9000/${path}`;

    if(params !== undefined) {
        const keys = [];
        for(let k in params) keys.push(k);

        const search = keys.reduce((a,b) => {
            return a + '&' + b + '=' + params[b];
        }, '').slice(1);

        return APIEnd + '?' + search;
    } else {
        return APIEnd;
    }
}