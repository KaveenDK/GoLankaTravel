import { useEffect, useState } from 'react'
import { Search, Trash2, Mail, Shield, User, AlertCircle, CheckCircle } from 'lucide-react'
import api from '../../services/api' // We'll call API directly here for simplicity, or you could create a userSlice
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import { toast } from 'react-hot-toast' // Assumes you have react-hot-toast installed

// Define User Type locally for this page
interface UserData {
  _id: string
  username: string
  email: string
  role: 'user' | 'admin' | 'guide'
  createdAt: string
}

const ManageUsers = () => {
  // State
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Modal State
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [roleModalUser, setRoleModalUser] = useState<UserData | null>(null)

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await api.get('/users') // Ensure your backend has this endpoint (GET /api/v1/users)
      setUsers(res.data.data.users)
    } catch (error) {
      console.error("Failed to fetch users", error)
      toast.error("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handlers
  const handleDeleteUser = async () => {
    if (!deleteId) return
    try {
      await api.delete(`/users/${deleteId}`)
      setUsers(users.filter(u => u._id !== deleteId))
      toast.success("User deleted successfully")
      setDeleteId(null)
    } catch (error) {
      toast.error("Failed to delete user")
    }
  }

  const handleRoleUpdate = async (newRole: string) => {
    if (!roleModalUser) return
    try {
      await api.patch(`/users/${roleModalUser._id}`, { role: newRole })
      
      // Update local state
      setUsers(users.map(u => 
        u._id === roleModalUser._id ? { ...u, role: newRole as any } : u
      ))
      
      toast.success(`User role updated to ${newRole}`)
      setRoleModalUser(null)
    } catch (error) {
      toast.error("Failed to update role")
    }
  }

  // Filter Logic
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View all registered users and manage their permissions.
        </p>
      </div>

      {/* 2. Search & Stats */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <Input 
          placeholder="Search by name or email..." 
          icon={<Search className="w-4 h-4" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md w-full"
        />
        <div className="flex gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Total: <span className="font-bold text-gray-900 dark:text-white">{users.length}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Admins: <span className="font-bold text-gray-900 dark:text-white">{users.filter(u => u.role === 'admin').length}</span>
            </div>
        </div>
      </div>

      {/* 3. Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No users found matching "{searchTerm}"
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    
                    {/* Column 1: User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-lg">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{user.username}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                             <Mail className="w-3 h-3" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Role Badge */}
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setRoleModalUser(user)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors hover:opacity-80 ${
                          user.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' 
                            : user.role === 'guide'
                            ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                            : 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                        }`}
                      >
                        {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                        {user.role === 'user' && <User className="w-3 h-3 mr-1" />}
                        {user.role.toUpperCase()}
                      </button>
                    </td>

                    {/* Column 3: Date */}
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Column 4: Actions */}
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setDeleteId(user._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Delete User Modal */}
      <Modal 
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)}
        title="Delete User Account"
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete this user?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            This will permanently remove the user and their booking history. This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white border-transparent"
              onClick={handleDeleteUser}
            >
              Yes, Delete User
            </Button>
          </div>
        </div>
      </Modal>

      {/* 5. Change Role Modal */}
      <Modal 
        isOpen={!!roleModalUser} 
        onClose={() => setRoleModalUser(null)}
        title="Change User Role"
      >
        <div className="space-y-4">
            <p className="text-sm text-gray-500">
                Update permissions for <span className="font-bold text-gray-900 dark:text-white">{roleModalUser?.username}</span>.
            </p>

            <div className="grid grid-cols-1 gap-3">
                {['user', 'admin', 'guide'].map((role) => (
                    <button
                        key={role}
                        onClick={() => handleRoleUpdate(role)}
                        className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                            roleModalUser?.role === role
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500'
                                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                    >
                        <div>
                            <p className="font-bold capitalize text-gray-900 dark:text-white">{role}</p>
                            <p className="text-xs text-gray-500">
                                {role === 'admin' ? 'Full access to dashboard & settings.' : 
                                 role === 'guide' ? 'Can manage assigned trips.' : 
                                 'Standard customer access.'}
                            </p>
                        </div>
                        {roleModalUser?.role === role && <CheckCircle className="w-5 h-5 text-purple-600" />}
                    </button>
                ))}
            </div>
            
            <div className="flex justify-end pt-2">
                <Button variant="ghost" onClick={() => setRoleModalUser(null)}>Cancel</Button>
            </div>
        </div>
      </Modal>

    </div>
  )
}

export default ManageUsers