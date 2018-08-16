function MVVM(options) {
	this.$options = options || {}
	var data = this._data = this.$options.data,
		_ = this;

	Object.keys(data).forEach(function(key) {
		_._proxyData(key)
	})

	this._initComputed()

	observe(data, this)

	this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
	$watch: function(key, cb, options) {
		new Watcher(this, key, cb)
	},

	_proxyData: function(key, setter, getter) {
		var _ = this;
		setter = setter || Object.defineProperty(_, key, {
			configurable: false,
			enumerable: true,
			get: function proxyGetter() {
				return _._data[key];
			},
			set: function proxySetter(newVal) {
				_._data[key] = newVal
			}
		})
	},

	_initComputed: function() {
		var _ = this,
			computed = this.$options.computed;

		if (typeof computed === 'object') {
			Object.keys(computed).forEach(function(key) {
				Object.defineProperty(_, key, {
					get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
					set: function() {}
				})
			})
		}
	}
}