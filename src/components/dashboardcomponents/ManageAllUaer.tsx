"use client";

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { updateUserRole, deleteUser } from '@/lib/actions/users';
import { 
  FiSearch, 
  FiUserCheck, 
  FiTrash2, 
  FiUser, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiFilter,
  FiX
} from 'react-icons/fi';

interface User {
  id: string;
  _id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role?: string;
  createdAt?: string;
}

interface ManageAllUaerProps {
  initialUsers: User[];
}

export default function ManageAllUaer({ initialUsers = [] }: ManageAllUaerProps) {
  const { data: session } = useSession();
  const currentUser = session?.user;

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  // Feedback states
  const [actionLoading, setActionLoading] = useState<string | null>(null); // holds userId during actions
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Delete modal state
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    try {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        showToast('success', result.message);
      } else {
        showToast('error', result.message);
      }
    } catch (error: any) {
      showToast('error', error?.message || "Failed to update role");
    } finally {
      setActionLoading(null);
    }
  };

  const handleUserDelete = async () => {
    if (!userToDelete) return;
    const userId = userToDelete.id;
    setActionLoading(userId);
    setUserToDelete(null);
    try {
      const result = await deleteUser(userId);
      if (result.success) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        showToast('success', result.message);
      } else {
        showToast('error', result.message);
      }
    } catch (error: any) {
      showToast('error', error?.message || "Failed to delete user");
    } finally {
      setActionLoading(null);
    }
  };

  // Filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || (user.role || 'user') === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#06060c] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${
          toast.type === 'success' 
            ? 'bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981]' 
            : 'bg-[#EF4444]/15 border-[#EF4444]/30 text-[#EF4444]'
        }`}>
          {toast.type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
          <span className="text-sm font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-80">
            <FiX size={16} />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111122] border border-[#8B5CF6]/20 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4 mx-auto">
              <FiAlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-white text-center mb-2">Delete User Account</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Are you sure you want to delete <span className="text-white font-semibold">{userToDelete.name || userToDelete.email}</span>? This action is permanent and cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 py-3 bg-[#16162a] hover:bg-[#1f1f3a] text-gray-300 rounded-xl transition-all font-semibold text-sm border border-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUserDelete}
                className="flex-1 py-3 bg-gradient-to-r from-red-650 to-red-500 hover:brightness-110 text-white rounded-xl transition-all font-semibold text-sm shadow-[0_4px_15px_rgba(239,68,68,0.25)]"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/40 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F43F5E]">
              MANAGE USERS
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              View user details, update system roles, and delete registered accounts.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-[#111122]/60 border border-[#8B5CF6]/15 rounded-xl px-4 py-2 self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-gray-400 font-medium">Total Registered Users: <strong className="text-white">{users.length}</strong></span>
          </div>
        </div>

        {/* Filters Controls */}
        <div className="flex flex-col sm:flex-row gap-4 bg-[#111122]/40 backdrop-blur-md p-4 rounded-2xl border border-gray-800/40">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/15 focus:border-[#EC4899] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm"
            />
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Role Filter */}
          <div className="relative min-w-[160px]">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-[#16162a]/60 border border-[#8B5CF6]/15 focus:border-[#EC4899] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#EC4899]/30 transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="all" className="bg-[#0c0c14]">All Roles</option>
              <option value="admin" className="bg-[#0c0c14]">Admin</option>
              <option value="user" className="bg-[#0c0c14]">User</option>
            </select>
            <FiFilter className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
          </div>
        </div>

        {/* Users Table / List */}
        <div className="bg-[#111122]/40 border border-gray-800/40 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#16162a] flex items-center justify-center text-gray-500 mb-4 border border-gray-800">
                <FiUser size={28} />
              </div>
              <h3 className="text-lg font-semibold text-white">No Users Found</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-xs">
                We couldn't find any users matching your query. Try resetting your search or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800/60 bg-[#16162a]/30">
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">User Details</th>
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">Registered On</th>
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400">System Role</th>
                      <th className="px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/40">
                    {filteredUsers.map((user) => {
                      const isSelf = currentUser?.email === user.email;
                      const role = user.role || 'user';
                      const isLoading = actionLoading === user.id;

                      return (
                        <tr key={user.id} className="hover:bg-[#16162a]/20 transition-all duration-150">
                          {/* User Details */}
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3">
                              {user.image ? (
                                <img 
                                  src={user.image} 
                                  alt={user.name || 'User'} 
                                  className="w-10 h-10 rounded-full object-cover border border-[#8B5CF6]/20"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8B5CF6]/30 to-[#EC4899]/30 flex items-center justify-center font-bold text-sm text-[#EC4899] border border-[#8B5CF6]/20">
                                  {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                                </div>
                              )}
                              <div>
                                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                                  {user.name || 'Anonymous User'}
                                  {isSelf && (
                                    <span className="text-[10px] font-bold bg-[#8B5CF6]/15 text-[#A78BFA] px-2 py-0.5 rounded-full border border-[#8B5CF6]/30 uppercase tracking-wide">
                                      You
                                    </span>
                                  )}
                                </h4>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Registered On */}
                          <td className="px-6 py-4.5 text-sm text-gray-400">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'N/A'}
                          </td>

                          {/* System Role */}
                          <td className="px-6 py-4.5">
                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider border ${
                                role === 'admin' 
                                  ? 'bg-[#EF4444]/10 text-red-400 border-red-500/20' 
                                  : 'bg-[#8B5CF6]/10 text-violet-400 border-violet-500/20'
                              }`}>
                                {role}
                              </span>

                              {/* Update selector */}
                              <select
                                value={role}
                                disabled={isSelf || isLoading}
                                onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                                className="bg-[#16162a]/65 border border-gray-800 focus:border-[#EC4899] rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                              >
                                <option value="user">Make User</option>
                                <option value="admin">Make Admin</option>
                              </select>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4.5 text-right">
                            <button
                              disabled={isSelf || isLoading}
                              onClick={() => setUserToDelete(user)}
                              className="inline-flex items-center justify-center p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                              title="Delete User Account"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View */}
              <div className="block md:hidden divide-y divide-gray-800/40">
                {filteredUsers.map((user) => {
                  const isSelf = currentUser?.email === user.email;
                  const role = user.role || 'user';
                  const isLoading = actionLoading === user.id;

                  return (
                    <div key={user.id} className="p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img 
                            src={user.image} 
                            alt={user.name || 'User'} 
                            className="w-10 h-10 rounded-full object-cover border border-[#8B5CF6]/20"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#16162a] flex items-center justify-center font-bold text-sm text-[#EC4899] border border-gray-800">
                            {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5 truncate">
                            {user.name || 'Anonymous User'}
                            {isSelf && (
                              <span className="text-[9px] font-bold bg-[#8B5CF6]/15 text-[#A78BFA] px-1.5 py-0.5 rounded-full border border-[#8B5CF6]/30 uppercase">
                                You
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gray-800/20">
                        <div>
                          <p className="text-gray-500 font-semibold mb-1">Registered</p>
                          <p className="text-gray-300 font-medium">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short'
                            }) : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-semibold mb-1">System Role</p>
                          <span className={`inline-block text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                            role === 'admin' 
                              ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                              : 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                          }`}>
                            {role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-800/20">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-500 font-semibold">Change Role:</span>
                          <select
                            value={role}
                            disabled={isSelf || isLoading}
                            onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                            className="bg-[#16162a] border border-gray-800 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>

                        <button
                          disabled={isSelf || isLoading}
                          onClick={() => setUserToDelete(user)}
                          className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <FiTrash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}