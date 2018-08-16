function Observer(data) {
	this.data = data
	this.walk(data)
}

Observer.prototype = {
	walk: function(data) {
		var _ = this
		Object.keys(data).forEach(function(key) {
			_.convert(key, data[key])
		})
	},

	convert: function(key, value) {
		this.defineReactive(this.data, key, value)
	},

	defineReactive: function(data, key, value) {
		var dep = new Dep()
		var childObj = observe(value)
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: false,
			get: function() {
				Dep.target && dep.depend()
				return value;
			},
			set: function(newValue) {
				if (value == newValue) {
					return
				}
				value = newValue;
				childObj = observe(newValue)
				dep.notify()
			}
		});
	}
}

function observe(data) {
	if (!data || typeof data !== 'object') {
		return false
	}

	return new Observer(data)
}

var uid = 0;

function Dep() {
	this.id = uid ++
	this.subs = []
}

Dep.prototype = {
	addSub: function(sub) {
		this.subs.push(sub)
	},

	depend: function() {
		Dep.target.addDep(this)
	},

	removeSub: function(sub) {
		var index = this.subs.indexOf(sub)
		if (index != -1) {
			this.subs.splice(index, 1)
		}
	},

	notify: function() {
		this.subs.forEach(function(sub) {
			sub.update()
		})
	}
}

Dep.target = null;