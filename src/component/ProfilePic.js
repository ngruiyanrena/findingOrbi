import { useEffect, useState } from 'react'
import { supabase } from '../client'
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

function ProfilePic({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadProfilePic = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div aria-live="polite"> 
      <img
        src={avatarUrl ? avatarUrl : `https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif`} // https://place-hold.it/${size}x${size}
        alt={avatarUrl ? 'Avatar' : 'No image'}
        className="avatar image"
        style={{ height: size, width: size }}
      />
      <div/>
      {uploading ? "Uploading..." : (
        <div>
        <label htmlFor="single">
          <Input accept="image/*" id="single" multiple type="file" onChange={uploadProfilePic}/>
          <Button size="small" variant="contained" component="span" startIcon={<PhotoCamera />}>Upload</Button>
        </label>
        </div>
      )}
    </div>
  )
}

export default ProfilePic;