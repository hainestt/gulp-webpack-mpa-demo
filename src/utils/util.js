
/**
 *
 * @export
 * @param {* Function} fn
 * @param {* Number} ms
 * @returns {* Function}
 *
 *
 */
export function debounce (fn, ms) {
	let timer = 0, scope, args

	let wrap = function () {
		if (timer) {
			clearTimeout(timer)
		}

		args = ([]).slice.call(arguments)
		scope = this
		timer = setTimeout(_ => {
			timer = 0
			fn.apply(scope, args)
		}, ms)
	}

	return wrap
}


/**
 *
 * @export
 * @param {* Function} fn
 * @param {* Number} ms
 * @param {* Boolean} immediate
 * @returns {* Function}
 *
 *
 */
export function debounceImmediate (fn, ms, immediate) {
	let timer, scope, args, timestamp, result, invokeNow

	let later = function () {
		let last = Date.now() - timestamp

		if (last < ms && last >= 0) {
			timer = setTimeout(later, ms - last)
		} else {
			timer = null
			if (!immediate) {
				result = fn.apply(scope, args)
				if (!timer) {
					scope = args = null
				}
			}
		}
	}

	let wrap = function () {
		scope = this
		args = arguments
		timestamp = Date.now()
		invokeNow = immediate && !timer

		if (!timer) {
			timer = setTimeout(later, ms)
		}

		if (invokeNow) {
			result = fn.apply(scope, args)
			scope = args = null
		}

		return result
	}

	return wrap

}

/**
 *
 *
 * @export
 * @param {* String} url
 * @param {* Function} callback
 * @param {* Object} options
 */
export function loadScript (url, callback, ...options) {
	let script = document.createElement('script')

	script.type = 'text/javascript'
	script.defer = options.defer || true

	if (script.readyState) {	// for IE10-
		script.onreadystatechange = () => {
			if (script.readyState == 'loaded' || script.readyState == 'complete') {
				script.onreadystatechange = null // GC
				callback()
			}
		}
	} else {
		script.onload = callback
	}

	script.src = url
	document.head.appendChild(script)
}


/**
 *
 * @export
 * @param {*} args
 * @returns
 */
export function typeOf (args) {
	return ({}).toString.call(args).slice(8, -1)
}

/**
 *
 *
 * @export
 * @param {*} value
 * @returns {* Number}
 * Number()转换规则：
 * 1, 1024 -> 1024, '4567.11' -> 4567.11
 * 2, true -> 1, false -> 0
 * 3, null -> 0, undefined -> NaN
 * 4, 0xA -> 10
 * 5, '' -> 0
 * 6, 不包含以上的返回NaN
 */
export function toNumber (value) {
	let number = (isNaN(value) || value === null) ? 0 : Number(value)

	return isNaN(number) ? 0 : number
}

