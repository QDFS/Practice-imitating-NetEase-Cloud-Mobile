import servers from "..";


//home中banner轮播图请求
export function getBanner() {
    return servers({
        method: 'get',
        url: '/banner?type=2'
    })
}

//home中发现歌单轮播
export function getMusicList() {
    return servers({
        method: 'get',
        url: '/personalized?limit=10'
    })
}

//搜索关键字
export function searchKeyWord(data) {
    return servers({
        method: 'get',
        url: `/cloudsearch?keywords=${data}&limit=50`,
        // type: 'json'
    })
}

// 二维码 key 生成接口
export function codeLoginKey() {
    return servers({
        method: 'get',
        url: `/login/qr/key?timestamp=${new Date().getTime()}`
    })
}

// 二维码生成接口
export function codeLoginCreate(data) {
    return servers({
        method: 'get',
        url: `/login/qr/create?key=${data}&timestamp=${new Date().getTime()}`
    })
}

// 二维码检测扫码状态接口
export function codeLoginCheck(data) {
    return servers({
        method: 'get',
        url: `/login/qr/check?key=${data}&timestamp=${new Date().getTime()}`
    })
}

//手机验证码登录,发送验证码
export function phoneLoginSent(data) {
    return servers({
        method: 'get',
        url: `/captcha/sent?phone=${data}`
    })
}


//验证验证码
export function phoneLoginVerify(data) {
    return servers({
        method: 'get',
        url: `/captcha/verify?phone=${data.phone}&captcha=${data.code}`
    })
}