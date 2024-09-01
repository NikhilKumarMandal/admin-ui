

function LoginPage() {
  return (
    <>
      <h1>Sign in</h1>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button>
        Log in
      </button>
      <label htmlFor="Remember-me">Remember me</label>
      <input type="checkbox" id="Remember-me" />
      <a href="#">Forget Password</a>
    </>
    
  )
}

export default LoginPage;