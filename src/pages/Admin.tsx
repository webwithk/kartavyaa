import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';
import { LogOut, Edit2, Trash2, Save, X, MessageSquare } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  demo_url?: string;
  tags: string[];
}

interface Service {
  id: number;
  tier: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-sky-400">Loading...</div>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-2xl w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Admin Panel</h2>
            <p className="text-slate-400 text-sm">Sign in to manage your portfolio</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 focus:outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-custom text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-sky-500/20">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 glass-panel p-4 rounded-2xl gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-custom flex items-center justify-center text-white font-bold">KSP</div>
            <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
          </div>
          
          <div className="flex gap-2 bg-slate-900/50 p-1 rounded-xl overflow-x-auto">
            {['projects', 'services', 'messages', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize whitespace-nowrap ${
                  activeTab === tab ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button 
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-red-300 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </header>
        
        <main className="glass-panel rounded-2xl p-6 min-h-[600px]">
          {activeTab === 'projects' && <ProjectsAdmin />}
          {activeTab === 'services' && <ServicesAdmin />}
          {activeTab === 'messages' && <MessagesAdmin />}
          {activeTab === 'settings' && <SettingsAdmin />}
        </main>
      </div>
    </div>
  );
}

// --- Projects Admin Component ---
function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<{ title: string; description: string; image_url: string; demo_url?: string; tags: string }>>({});
  
  const fetchProjects = async () => {
    const { data } = await supabase.from('portfolio_projects').select('*').order('id');
    if (data) setProjects(data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project, tags: JSON.stringify(project.tags) });
  };

  const handleSave = async (id: number) => {
    try {
      const tagsArray = JSON.parse(editForm.tags!);
      const { error } = await supabase
        .from('portfolio_projects')
        .update({
          title: editForm.title,
          description: editForm.description,
          image_url: editForm.image_url,
          demo_url: editForm.demo_url,
          tags: tagsArray
        })
        .eq('id', id);
        
      if (error) throw error;
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      alert('Error saving: ' + (err as Error).message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
        <p className="text-sm text-slate-400">Edit your portfolio showcase</p>
      </div>
      
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            {editingId === project.id ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">Title</label>
                  <input type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Live URL</label>
                  <input type="text" value={editForm.demo_url || ''} onChange={e => setEditForm({...editForm, demo_url: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-400">Image URL</label>
                  <input type="text" value={editForm.image_url} onChange={e => setEditForm({...editForm, image_url: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-400">Description</label>
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white h-20" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-slate-400">Tags (JSON array format: ["Tag1", "Tag2"])</label>
                  <input type="text" value={editForm.tags} onChange={e => setEditForm({...editForm, tags: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm flex items-center gap-1"><X size={14}/> Cancel</button>
                  <button onClick={() => handleSave(project.id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm flex items-center gap-1"><Save size={14}/> Save</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <img src={project.image_url} alt={project.title} className="w-24 h-16 object-cover rounded-lg border border-slate-700" />
                <div className="flex-grow">
                  <h3 className="font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-1">{project.description}</p>
                  <div className="flex gap-2 mt-2">
                    {project.tags.map((t: string, i: number) => <span key={i} className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">{t}</span>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(project)} className="p-2 bg-slate-800 hover:bg-sky-500/20 text-sky-400 rounded-lg transition-colors"><Edit2 size={16} /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Services Admin Component ---
function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<{ tier: string; price: string; features: string; recommended?: boolean }>>({});
  
  const fetchServices = async () => {
    const { data } = await supabase.from('portfolio_services').select('*').order('id');
    if (data) setServices(data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ ...service, features: JSON.stringify(service.features) });
  };

  const handleSave = async (id: number) => {
    try {
      const featuresArray = JSON.parse(editForm.features!);
      const { error } = await supabase
        .from('portfolio_services')
        .update({
          tier: editForm.tier,
          price: editForm.price,
          features: featuresArray,
          recommended: editForm.recommended
        })
        .eq('id', id);
        
      if (error) throw error;
      setEditingId(null);
      fetchServices();
    } catch (err) {
      alert('Error saving: ' + (err as Error).message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Services</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            {editingId === service.id ? (
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-slate-400">Tier Name</label>
                    <input type="text" value={editForm.tier} onChange={e => setEditForm({...editForm, tier: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                  </div>
                  <div className="w-24">
                    <label className="text-xs text-slate-400">Price</label>
                    <input type="text" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Features (JSON array format: ["Feat1", "Feat2"])</label>
                  <textarea value={editForm.features} onChange={e => setEditForm({...editForm, features: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white h-20" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id={`rec-${service.id}`} checked={editForm.recommended} onChange={e => setEditForm({...editForm, recommended: e.target.checked})} className="rounded bg-slate-900 border-slate-700" />
                  <label htmlFor={`rec-${service.id}`} className="text-sm text-slate-300">Highlight as Recommended</label>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm flex items-center gap-1"><X size={14}/> Cancel</button>
                  <button onClick={() => handleSave(service.id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm flex items-center gap-1"><Save size={14}/> Save</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-2">
                      {service.tier} 
                      {service.recommended && <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full uppercase tracking-wider">Recommended</span>}
                    </h3>
                    <p className="text-lg font-bold text-sky-400">{service.price}</p>
                  </div>
                  <button onClick={() => handleEdit(service)} className="p-2 bg-slate-800 hover:bg-sky-500/20 text-sky-400 rounded-lg transition-colors"><Edit2 size={16} /></button>
                </div>
                <ul className="mt-4 space-y-1">
                  {service.features.map((f: string, i: number) => (
                    <li key={i} className="text-sm text-slate-400 flex items-center gap-2">• {f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Settings Admin Component ---
function SettingsAdmin() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState({ message: '', isError: false });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail && !newPassword) {
      setStatus({ message: 'Please enter a new email or password to update.', isError: true });
      return;
    }

    setLoading(true);
    setStatus({ message: '', isError: false });

    const updates: { email?: string; password?: string } = {};
    if (newEmail) updates.email = newEmail;
    if (newPassword) updates.password = newPassword;

    const { error } = await supabase.auth.updateUser(updates);

    setLoading(false);

    if (error) {
      setStatus({ message: error.message, isError: true });
    } else {
      setStatus({ 
        message: 'Credentials updated successfully! ' + (newEmail ? '(Note: Email changes may require verification if enabled on the server).' : ''), 
        isError: false 
      });
      setNewPassword('');
      setNewEmail('');
    }
  };

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <p className="text-sm text-slate-400">Update your admin login credentials securely.</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">New Email Address</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Leave blank to keep current email"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 focus:outline-none text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 focus:outline-none text-sm"
            minLength={6}
          />
        </div>

        {status.message && (
          <div className={`p-3 rounded-lg text-sm ${status.isError ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
            {status.message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-3 bg-gradient-custom text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-sky-500/20 disabled:opacity-50 mt-4"
        >
          {loading ? 'Updating...' : 'Update Credentials'}
        </button>
      </form>
    </div>
  );
}
function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const fetchMessages = async () => {
    const { data } = await supabase.from('portfolio_messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
  };

  useEffect(() => { 
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMessages().catch(err => console.error('Error fetching messages:', err)); 
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('portfolio_messages').delete().eq('id', id);
    fetchMessages();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
        <button onClick={fetchMessages} className="text-sm text-sky-400 hover:text-sky-300">Refresh</button>
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center py-12 text-slate-500 flex flex-col items-center">
          <MessageSquare size={48} className="mb-4 opacity-20" />
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 relative group">
              <button 
                onClick={() => handleDelete(msg.id)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={16} />
              </button>
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="font-bold text-white text-lg">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-sm text-sky-400 hover:underline">{msg.email}</a>
                <span className="text-xs text-slate-500 ml-auto mr-8">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap bg-slate-950 p-4 rounded-lg mt-3 text-sm border border-slate-800/50">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}