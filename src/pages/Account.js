import { useState, useEffect } from 'react'
import { supabase } from '../client'
import Avatar from '../component/ProfilePic'
import { Button } from "@material-ui/core";
import { IconPhone, Input, IconBookOpen, IconUser } from "@supabase/ui";
import { Link } from 'react-router-dom';


function Account() {
  const session = supabase.auth.session()
  // const key = session.user.id

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [major, setMajor] = useState(null)
  const [yearOfStudy, setYearOfStudy] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url, major, yearOfStudy`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
        setMajor(data.major)
        setYearOfStudy(data.yearOfStudy)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
        major,
        yearOfStudy
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="form-widget">



        <Avatar
            url={avatar_url}
            size={150}
            onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, avatar_url: url })
            }}
        />
         
        <div aria-live="polite">
            {loading ? (
            'Saving ...'
            ) : (
            <form onSubmit={updateProfile} className="form-widget">
                <div>Email: {session.user.email}</div>
                <div>
                    <Input
                        label="Tele Handle: "
                        descriptionText=' '
                        icon={<IconPhone />}
                        type="text"
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        label="Major:"
                        descriptionText=' '
                        icon={<IconBookOpen />}
                        type="text"
                        value={major || ''}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        label="Year Of Study:"
                        descriptionText=' '
                        icon={<IconUser />}
                        type="text"
                        value={yearOfStudy || ''}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                    />
                </div>
                <div>
                    <button className="button block primary" disabled={loading}>
                        Update profile
                    </button>
                </div>
            </form>
            )}
            <h4> </h4>
            <Link to="/"> 
            <Button size='small' variant='contained' onClick={() => supabase.auth.signOut()}>
                Sign Out
            </Button> </Link>
        </div>
    </div>

    
  )
}

export default Account