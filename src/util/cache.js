export const cache = {
    setStorage: function(key, data) {
        if (typeof data === 'object') {
            localStorage.setItem(key, JSON.stringify(data))
        } else {
            localStorage.setItem(key, data)
        }
    },

    getStroage: function(key) {
        let data = localStorage.getItem(key)
        try {
            return JSON.parse(data)
        } catch(e) {
            return data
        }
    },

    clearStorage: function (key) {
        localStorage.removeItem(key)
    }
}
