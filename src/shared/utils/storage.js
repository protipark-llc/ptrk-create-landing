/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STORAGE UTILITY - GESTIÓN DE LOCALSTORAGE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const Storage = (function() {
  'use strict';

  const PREFIX = 'protipark_';
  const VERSION = '1.0';

  /* ─ PRIVADO ─ */

  function getKey(name) {
    return `${PREFIX}${name}`;
  }

  function isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  function getQuota() {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return {
        used: total,
        limit: 5242880, // 5MB estándar
        percentUsed: Math.round((total / 5242880) * 100)
      };
    } catch {
      return { used: 0, limit: 0, percentUsed: 0 };
    }
  }

  /* ─ PÚBLICO ─ */

  return {
    /**
     * Guardar un valor en localStorage
     * @param {string} name - Nombre de la clave
     * @param {*} value - Valor a guardar (se convierte a JSON)
     * @returns {boolean} true si se guardó correctamente
     */
    set: function(name, value) {
      if (!isStorageAvailable()) {
        console.warn('localStorage no disponible');
        return false;
      }

      try {
        const key = getKey(name);
        const data = JSON.stringify({
          value,
          timestamp: new Date().toISOString(),
          version: VERSION
        });
        localStorage.setItem(key, data);
        return true;
      } catch (error) {
        console.error(`Error guardando "${name}":`, error);
        return false;
      }
    },

    /**
     * Recuperar un valor de localStorage
     * @param {string} name - Nombre de la clave
     * @param {*} defaultValue - Valor por defecto si no existe
     * @returns {*} El valor guardado o el valor por defecto
     */
    get: function(name, defaultValue = null) {
      if (!isStorageAvailable()) {
        return defaultValue;
      }

      try {
        const key = getKey(name);
        const item = localStorage.getItem(key);

        if (!item) {
          return defaultValue;
        }

        const parsed = JSON.parse(item);
        return parsed.value !== undefined ? parsed.value : defaultValue;
      } catch (error) {
        console.error(`Error recuperando "${name}":`, error);
        return defaultValue;
      }
    },

    /**
     * Eliminar un valor de localStorage
     * @param {string} name - Nombre de la clave
     * @returns {boolean} true si se eliminó correctamente
     */
    remove: function(name) {
      if (!isStorageAvailable()) {
        return false;
      }

      try {
        const key = getKey(name);
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error(`Error eliminando "${name}":`, error);
        return false;
      }
    },

    /**
     * Limpiar todo el almacenamiento de Protipark
     * @returns {boolean} true si se limpió correctamente
     */
    clear: function() {
      if (!isStorageAvailable()) {
        return false;
      }

      try {
        const keys = [];
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key) && key.startsWith(PREFIX)) {
            keys.push(key);
          }
        }
        keys.forEach(key => localStorage.removeItem(key));
        return true;
      } catch (error) {
        console.error('Error limpiando storage:', error);
        return false;
      }
    },

    /**
     * Verificar si una clave existe
     * @param {string} name - Nombre de la clave
     * @returns {boolean}
     */
    has: function(name) {
      if (!isStorageAvailable()) {
        return false;
      }

      const key = getKey(name);
      return localStorage.getItem(key) !== null;
    },

    /**
     * Obtener todas las claves de Protipark
     * @returns {string[]} Array de nombres de claves
     */
    keys: function() {
      if (!isStorageAvailable()) {
        return [];
      }

      const keys = [];
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith(PREFIX)) {
          keys.push(key.replace(PREFIX, ''));
        }
      }
      return keys;
    },

    /**
     * Obtener toda la información de almacenamiento
     * @returns {Object} Objeto con toda la información
     */
    info: function() {
      const quota = getQuota();
      return {
        available: isStorageAvailable(),
        keys: this.keys(),
        quota: quota,
        isEmpty: this.keys().length === 0
      };
    },

    /**
     * Incrementar un valor numérico
     * @param {string} name - Nombre de la clave
     * @param {number} amount - Cantidad a incrementar (default 1)
     * @returns {number} Nuevo valor
     */
    increment: function(name, amount = 1) {
      const current = this.get(name, 0);
      const newValue = current + amount;
      this.set(name, newValue);
      return newValue;
    },

    /**
     * Decrementar un valor numérico
     * @param {string} name - Nombre de la clave
     * @param {number} amount - Cantidad a decrementar (default 1)
     * @returns {number} Nuevo valor
     */
    decrement: function(name, amount = 1) {
      return this.increment(name, -amount);
    },

    /**
     * Añadir un elemento a un array almacenado
     * @param {string} name - Nombre de la clave
     * @param {*} item - Elemento a añadir
     * @returns {boolean}
     */
    push: function(name, item) {
      const current = this.get(name, []);
      if (!Array.isArray(current)) {
        console.warn(`"${name}" no es un array`);
        return false;
      }
      current.push(item);
      return this.set(name, current);
    },

    /**
     * Escuchar cambios en storage (entre pestañas)
     * @param {string} name - Nombre de la clave
     * @param {Function} callback - Función a ejecutar
     * @returns {Function} Función para remover el listener
     */
    watch: function(name, callback) {
      const key = getKey(name);

      const handleStorageChange = (event) => {
        if (event.key === key) {
          try {
            const oldValue = event.oldValue ? JSON.parse(event.oldValue).value : null;
            const newValue = event.newValue ? JSON.parse(event.newValue).value : null;
            callback(newValue, oldValue);
          } catch (error) {
            console.error('Error en watch:', error);
          }
        }
      };

      window.addEventListener('storage', handleStorageChange);

      // Retornar función para remover el listener
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  };
})();

// Hacer disponible globalmente
if (typeof window !== 'undefined') {
  window.Storage = Storage;
}
