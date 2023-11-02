import servers from "..";

// 获取歌单内容
export function getMusicItem(data) {
    return servers({
        method: 'get',
        url: `/playlist/detail?id=${data}`
    })
}

// 获取全部歌曲
export function getSongs(data) {
    return servers({
        method: 'get',
        url: `/song/detail?ids=${data}`
    })
}

// 获取歌曲
export function getMusic(data) {
    return servers({
        method: 'get',
        url: `/song/url?id=${data}`
    })
}

// 获取播放歌曲歌词
export function getLyric(data) {
    return servers({
        method: 'get',
        url: `/lyric?id=${data}`
    })
}