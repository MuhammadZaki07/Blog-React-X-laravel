import FormProfile from '../../components/FormProfile'

function Profile() {
  return (
    <div className="py-14">
    <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-300/[0.5] overflow-hidden relative">
      <div className="relative">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
          <p className="text-slate-600 mt-1">
            Update your personal information and profile picture
          </p>
        </div>

        <FormProfile/>
      </div>
    </div>
  </div>
  )
}

export default Profile