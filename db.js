/**
 * Simple Database wrapper using localStorage for DrogaMax
 */
const DB = {
    USER_KEY: 'drogamax_users',

    /**
     * Get all users from storage
     * @returns {Array} List of users
     */
    getUsers: function() {
        const users = localStorage.getItem(this.USER_KEY);
        return users ? JSON.parse(users) : [];
    },

    /**
     * Save a new user
     * @param {Object} user { name, email, password }
     * @returns {Object} { success: boolean, message: string }
     */
    saveUser: function(user) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (users.find(u => u.email === user.email)) {
            return { success: false, message: 'Este e-mail já está cadastrado.' };
        }

        users.push({
            ...user,
            id: Date.now(),
            createdAt: new Date().toISOString()
        });

        localStorage.setItem(this.USER_KEY, JSON.stringify(users));
        return { success: true, message: 'Cadastro realizado com sucesso!' };
    },

    /**
     * Find a user by email
     * @param {string} email 
     * @returns {Object|null}
     */
    findUser: function(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email) || null;
    }
};

export default DB;
