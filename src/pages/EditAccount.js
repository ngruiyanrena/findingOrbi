import { useState, useEffect } from 'react'
import { supabase } from '../client'
import ProfilePic from '../component/ProfilePic'
import { Input, IconBookOpen, IconUser, IconMessageCircle } from "@supabase/ui";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from "../component/Box";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function EditAccount() {
  const session = supabase.auth.session()

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [major, setMajor] = useState(null)
  const [yearOfStudy, setYearOfStudy] = useState(null)
  const [workingStyle1, setWorkingStyle1] = useState(null)
  const [workingStyle2, setWorkingStyle2] = useState(null)
  const [workingStyle3, setWorkingStyle3] = useState(null)
  const [workingStyle4, setWorkingStyle4] = useState(null)
  const [workingStyle5, setWorkingStyle5] = useState(null)


  const [availableDay, setAvailableDay] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailableDay(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  

  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select('*')
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
        if (data.availableDay.length !== 0) {
          setAvailableDay(typeof data.availableDay === 'string' ? data.availableDay.split(',') : data.availableDay)
        }
        setWorkingStyle1(data.workingStyle1)
        setWorkingStyle2(data.workingStyle2)
        setWorkingStyle3(data.workingStyle3)
        setWorkingStyle4(data.workingStyle4)
        setWorkingStyle5(data.workingStyle5)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
        major,
        yearOfStudy,
        availableDay,
        workingStyle1, 
        workingStyle2, 
        workingStyle3, 
        workingStyle4, 
        workingStyle5,
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

      <h1> Edit Profile </h1>

        <ProfilePic
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
          <form onSubmit={e => e.preventDefault()} className="form-widget">
            <h1> </h1> <div>Email: {session.user.email}</div>
              <div>
                  <Input
                      label="Tele Handle: "
                      descriptionText=' '
                      icon={<IconMessageCircle />}
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
                  <FormControl sx={{ m: 1, minWidth: 600 }}>
                    <InputLabel id="availableDays">Available Days</InputLabel>
                    <Select
                      labelId="availableDays"
                      id="availableDays"
                      multiple
                      value={availableDay || ''}
                      onChange={handleChange}
                      input={<OutlinedInput label="Available Days" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                      autoWidth
                    >
                      {days.map((day) => (
                        <MenuItem key={day} value={day}>
                          <Checkbox checked={availableDay.indexOf(day) > -1} />
                          <ListItemText primary={day} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </div>
              <Box>
                <h3> Personal Working Style: </h3>
                <FormControl>
                  <RadioGroup
                    row
                    onChange={e => setWorkingStyle1(e.target.value)}
                  >
                    <FormControlLabel value="Team Member" control={<Radio />} label="Team Member" />
                    <FormControlLabel value="Team Leader" control={<Radio />} label="Team Leader" />
                  </RadioGroup>
                  <RadioGroup
                    row
                    onChange={e => setWorkingStyle2(e.target.value)}
                  >
                    <FormControlLabel value="Supportive" control={<Radio />} label="Supportive" />
                    <FormControlLabel value="Take Charge" control={<Radio />} label="Take Charge" />
                  </RadioGroup>
                  <RadioGroup
                    row
                    onChange={e => setWorkingStyle3(e.target.value)}
                  >
                    <FormControlLabel value="Organised" control={<Radio />} label="Organised" />
                    <FormControlLabel value="Spontaneous" control={<Radio />} label="Spontaneous" />
                  </RadioGroup>
                  <RadioGroup
                    row
                    onChange={e => setWorkingStyle4(e.target.value)}
                  >
                    <FormControlLabel value="Detail Oriented" control={<Radio />} label="Detail Oriented" />
                    <FormControlLabel value="Broad Perspective" control={<Radio />} label="Broad Perspective" />
                  </RadioGroup>
                  <RadioGroup
                    row
                    onChange={e => setWorkingStyle5(e.target.value)}
                  >
                    <FormControlLabel value="Creative" control={<Radio />} label="Creative" />
                    <FormControlLabel value="Strategic" control={<Radio />} label="Strategic" />
                  </RadioGroup>
                </FormControl>
              </Box>
              <div> 
                <Link to="/Account" style={{ textDecoration: 'none' }}>
                  <Button onClick={updateProfile} disabled={loading} variant="contained">Update Profile</Button>
                </Link>
              </div>
          </form>
          )}
        </div>
    </div>

    
  )
}

export default EditAccount