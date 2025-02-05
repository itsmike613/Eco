const eco = {
    /**
     * Retrieves a value from localStorage.
     * @param {string} key - The key to retrieve the value for.
     * @returns {number} The value stored under the key, or 0 if not found or invalid.
     */
    get(key) {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data === null) return 0;
            return data;
        } catch (error) {
            console.error(`Error getting key '${key}':`, error);
            return 0;
        }
    },

    /**
     * Sets a value in localStorage.
     * If the value has a 'min' and 'max' property, it will be randomized within that range.
     * @param {string} key - The key to set the value for.
     * @param {number|object} value - The value to store. If it's an object, it must contain 'min' and 'max' properties to randomize the value.
     */
    set(key, value) {
        try {
            if (
                typeof value === "object" &&
                value.min !== undefined &&
                value.max !== undefined
            ) {
                value = this.randomize(value.min, value.max);
            }

            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting key '${key}':`, error);
        }
    },

    /**
     * Adds a value to the current value of a key in localStorage.
     * If the value has a 'min' and 'max' property, it will be randomized within that range.
     * @param {string} key - The key to add to.
     * @param {number|object} amount - The amount to add. Can be a number or an object with 'min' and 'max' to randomize.
     */
    add(key, amount) {
        try {
            if (
                typeof amount === "object" &&
                amount.min !== undefined &&
                amount.max !== undefined
            ) {
                amount = this.randomize(amount.min, amount.max);
            }
            this.set(key, this.get(key) + amount);
        } catch (error) {
            console.error(`Error adding to key '${key}':`, error);
        }
    },

    /**
     * Subtracts a value from an existing key in localStorage.
     * If the value has a 'min' and 'max' property, it will be randomized within that range.
     * @param {string} key - The key to subtract from.
     * @param {number|object} amount - The amount to subtract. Can be a number or an object with 'min' and 'max' to randomize.
     */
    sub(key, amount) {
        try {
            if (
                typeof amount === "object" &&
                amount.min !== undefined &&
                amount.max !== undefined
            ) {
                amount = this.randomize(amount.min, amount.max);
            }
            this.set(key, Math.max(0, this.get(key) - amount));
        } catch (error) {
            console.error(`Error subtracting from key '${key}':`, error);
        }
    },

    /**
     * Deletes a key from localStorage.
     * @param {string} key - The key to delete.
     */
    del(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error deleting key '${key}':`, error);
        }
    },

    /**
     * Clears all keys from localStorage.
     */
    res() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error resetting localStorage:", error);
        }
    },

    /**
     * Generates a random number between min and max (inclusive).
     * @param {number} min - The minimum number.
     * @param {number} max - The maximum number.
     * @returns {number} A random number between min and max.
     */
    randomize(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Multiplies the value of a key in localStorage by a given amount.
     * If the amount has a 'min' and 'max' property, it will be randomized within that range.
     * @param {string} key - The key to multiply.
     * @param {number|object} amount - The amount to multiply by. Can be a number or an object with 'min' and 'max' to randomize.
     */
    mul(key, amount) {
        try {
            if (
                typeof amount === "object" &&
                amount.min !== undefined &&
                amount.max !== undefined
            ) {
                amount = this.randomize(amount.min, amount.max);
            }
            this.set(key, this.get(key) * amount);
        } catch (error) {
            console.error(`Error multiplying key '${key}':`, error);
        }
    },

    /**
     * Divides the value of a key in localStorage by a given amount.
     * If the amount has a 'min' and 'max' property, it will be randomized within that range.
     * @param {string} key - The key to divide.
     * @param {number|object} amount - The amount to divide by. Can be a number or an object with 'min' and 'max' to randomize.
     */
    div(key, amount) {
        try {
            if (
                typeof amount === "object" &&
                amount.min !== undefined &&
                amount.max !== undefined
            ) {
                amount = this.randomize(amount.min, amount.max);
            }
            this.set(key, Math.max(0, this.get(key) / amount));
        } catch (error) {
            console.error(`Error dividing key '${key}':`, error);
        }
    },

    /**
     * Sets multiple values in localStorage.
     * If any value has 'min' and 'max' properties, it will be randomized within that range.
     * @param {Array} items - An array of objects, each containing a 'key' and 'value'. The 'value' can be an object with 'min' and 'max' for randomization.
     */
    batchSet(items) {
        try {
            items.forEach(({ key, value }) => {
                if (
                    typeof value === "object" &&
                    value.min !== undefined &&
                    value.max !== undefined
                ) {
                    value = this.randomize(value.min, value.max);
                }
                this.set(key, value);
            });
        } catch (error) {
            console.error("Error batch setting:", error);
        }
    },

    /**
     * Adds multiple values to existing keys in localStorage.
     * If any amount has 'min' and 'max' properties, it will be randomized within that range.
     * @param {Array} items - An array of objects, each containing a 'key' and 'value'. The 'value' can be an object with 'min' and 'max' for randomization.
     */
    batchAdd(items) {
        try {
            items.forEach(({ key, value }) => {
                if (
                    typeof value === "object" &&
                    value.min !== undefined &&
                    value.max !== undefined
                ) {
                    value = this.randomize(value.min, value.max);
                }
                this.add(key, value);
            });
        } catch (error) {
            console.error("Error batch adding:", error);
        }
    },

    /**
     * Subtracts multiple values from existing keys in localStorage.
     * If any amount has 'min' and 'max' properties, it will be randomized within that range.
     * @param {Array} items - An array of objects, each containing a 'key' and 'value'. The 'value' can be an object with 'min' and 'max' for randomization.
     */
    batchSub(items) {
        try {
            items.forEach(({ key, value }) => {
                if (
                    typeof value === "object" &&
                    value.min !== undefined &&
                    value.max !== undefined
                ) {
                    value = this.randomize(value.min, value.max);
                }
                this.sub(key, value);
            });
        } catch (error) {
            console.error("Error batch subtracting:", error);
        }
    },

    /**
	 * Multiplies multiple values for existing keys in localStorage.
	 * If any amount has 'min' and 'max' properties, it will be randomized within that range.
	 * @param {Array} items - An array of objects, each containing a 'key' and 'value'. The 'value' can be an object with 'min' and 'max' for randomization.
	 */
	batchMul(items) {
		try {
			items.forEach(({ key, value }) => {
				if (
					typeof value === "object" &&
					value.min !== undefined &&
					value.max !== undefined
				) {
					value = this.randomize(value.min, value.max);
				}
				this.mul(key, value);
			});
		} catch (error) {
			console.error("Error batch multiplying:", error);
		}
	},

	/**
	 * Divides multiple values for existing keys in localStorage.
	 * If any amount has 'min' and 'max' properties, it will be randomized within that range.
	 * @param {Array} items - An array of objects, each containing a 'key' and 'value'. The 'value' can be an object with 'min' and 'max' for randomization.
	 */
	batchDiv(items) {
		try {
			items.forEach(({ key, value }) => {
				if (
					typeof value === "object" &&
					value.min !== undefined &&
					value.max !== undefined
				) {
					value = this.randomize(value.min, value.max);
				}
				this.div(key, value);
			});
		} catch (error) {
			console.error("Error batch dividing:", error);
		}
	},

    /**
	 * Deletes multiple keys from localStorage.
	 * @param {Array} keys - An array of keys to delete from localStorage.
	 */
	batchDel(keys) {
		try {
			keys.forEach((key) => this.del(key));
		} catch (error) {
			console.error("Error batch deleting:", error);
		}
	},

    /**
     * Retrieves multiple values from localStorage.
     * @param {Array} keys - An array of keys to retrieve values for.
     * @returns {Object} An object where each key maps to its corresponding value from localStorage.
     */
    batchGet(keys) {
        try {
            return keys.reduce((result, key) => {
                result[key] = this.get(key);
                return result;
            }, {});
        } catch (error) {
            console.error("Error batch getting:", error);
            return {};
        }
    },
};
