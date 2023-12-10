import { JWT } from 'node-jsonwebtoken';
const jwt = new JWT(process.env.JWT_TOKEN as string);

export const signJWT = async (obj: any, exp = '30d') => {
    try {
        return await jwt.sign(obj, { expiresIn: exp, })
    } catch (e) {
        return false
    }
}

export const verifyJWT = async (token: any) => {
    try {
        let v: any = await jwt.verify(token)
        delete v.iat;
        delete v.exp;
        return v
    } catch (e) {
        return false
    }
}

export const decode = (obj: any) => JSON.parse(decodeURIComponent(JSON.stringify(obj).replace(/[+]/g, ' ')));
export const parser = (str: any) => str.split('&').reduce((obj: any, pair: any) => { const [key, value] = pair.split('='); return { ...obj, [key]: value }; }, {});

export const formatRupiah = (angka: any, prefix?: any) => {
    let separator: any;
    let number_string = angka.toString().replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}