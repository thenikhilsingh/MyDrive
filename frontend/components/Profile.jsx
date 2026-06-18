import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
  Folder,
  FileText,
  Share2,
} from "lucide-react";

export default function Profile() {
  const user = {
    name: "Nikhil Singh",
    email: "nikhil@example.com",
    role: "Administrator",
    joined: "12 Feb 2024",
    storage: "12.4 GB / 50 GB",
    files: 128,
    folders: 32,
    sharedItems: 8,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600">
              <User size={34} />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{user.name}</h1>
              <p className="text-gray-500 mt-1">Member since {user.joined}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="border border-blue-500 text-blue-600 px-5 py-3 rounded-xl hover:bg-blue-50">
              Edit Profile
            </button>
            <button className="border border-gray-300 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-100">
              Change Password
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
            <div className="flex items-center gap-3 text-blue-600">
              <Mail size={18} />
              <span className="text-sm font-medium text-gray-500">Email</span>
            </div>
            <p className="mt-4 font-medium">{user.email}</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
            <div className="flex items-center gap-3 text-green-600">
              <ShieldCheck size={18} />
              <span className="text-sm font-medium text-gray-500">Role</span>
            </div>
            <p className="mt-4 font-medium">{user.role}</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
            <div className="flex items-center gap-3 text-indigo-600">
              <CalendarDays size={18} />
              <span className="text-sm font-medium text-gray-500">Storage</span>
            </div>
            <p className="mt-4 font-medium">{user.storage}</p>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
            <div className="flex items-center gap-3 text-orange-600">
              <User size={18} />
              <span className="text-sm font-medium text-gray-500">Profile</span>
            </div>
            <p className="mt-4 font-medium">{user.name}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Account Details</h2>
              <p className="text-gray-500 mt-1">
                Manage your account information and preferences.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="mt-2 font-medium">{user.name}</p>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="mt-2 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
                <p className="text-sm text-gray-500">User Role</p>
                <p className="mt-2 font-medium">{user.role}</p>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-slate-50 p-5">
                <p className="text-sm text-gray-500">Joined Date</p>
                <p className="mt-2 font-medium">{user.joined}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Workspace Summary</h2>
          <p className="text-gray-500 mt-1">
            Quick view of your file and folder usage.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between rounded-3xl border border-gray-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3 text-blue-600">
                <FileText size={18} />
                <span className="font-medium">Files</span>
              </div>
              <span className="font-semibold">{user.files}</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl border border-gray-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3 text-amber-600">
                <Folder size={18} />
                <span className="font-medium">Folders</span>
              </div>
              <span className="font-semibold">{user.folders}</span>
            </div>
            <div className="flex items-center justify-between rounded-3xl border border-gray-100 bg-slate-50 p-4">
              <div className="flex items-center gap-3 text-purple-600">
                <Share2 size={18} />
                <span className="font-medium">Shared Items</span>
              </div>
              <span className="font-semibold">{user.sharedItems}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
