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
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

export const MtoKM = (q: any) => parseFloat(q) < 1000 ? `${q} m` : (parseFloat(q) / 1000).toFixed(0) + ' km';
export const MtoRp = (meter: any, tarif: any) => {
    meter = parseFloat(meter), tarif = parseFloat(tarif);
    if (meter < 1000) return meter * (tarif / 1000);
    else {
        const rupiah = Math.floor((meter / 1000) * tarif);
        const sisa = meter % 1000;
        return sisa === 0 ? rupiah : (rupiah + sisa * (tarif / 1000)).toFixed(0);
    }
}

export const getEstimateTime = (jarak: any) => {
    jarak = (parseFloat(jarak) / 1000).toFixed(1); 
    let speedPerJam = 60;
    const speedPerMenit = speedPerJam / 60;
    const menit = jarak / speedPerMenit;
    const jam = menit / 60;
    return jam < 1 ? `${menit.toFixed(0) as any == 0 ? 1 : menit.toFixed(0)} menit` : `${jam.toFixed(0)} jam`
}