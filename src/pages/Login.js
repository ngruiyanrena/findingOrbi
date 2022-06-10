import { Auth, Typography, Button } from '@supabase/ui'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient (
    "https://usdkpglbmcrjdwveyjkv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZGtwZ2xibWNyamR3dmV5amt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ1ODkyNTgsImV4cCI6MTk3MDE2NTI1OH0.f0nF1DbZ1ERAQy03Kz2RBkkX7bx341ACIFBL4tyVwjY"
)

export const useAuth = () => {
    return Auth.useUser();
  };

const Container = (props) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return props.children
}

export default function AuthBasic() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Container>
    </Auth.UserContextProvider>
  )
}