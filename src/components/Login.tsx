import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, logInWithFacebook, logInWithGithub, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <section className="vh-90 gradient-custom login">
      <div className="container py-5 h-90 rounded-lg">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" >
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-4">
                    <input type="email" value={email} id="typeEmailX" onChange={(e) => setEmail(e.target.value)}
                      className="form-control text-white form-control-lg bg-dark" placeholder="Email" />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" value={password}
                      onChange={(e) => setPassword(e.target.value)} className="text-white form-control form-control-lg bg-dark" placeholder="Password" />
                  </div>

                  <p className="small mb-5 pb-lg-2"><Link className="text-white-50 fw-bold" to="/reset">Forgot Password ?</Link></p>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={() => logInWithEmailAndPassword(email, password)}>Login</button>

                  <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white icon" onClick={logInWithFacebook}><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                    <a href="#!" className="text-white icon" onClick={logInWithGithub}><FontAwesomeIcon icon={faGithub} size="2x" /></a>
                    <a href="#!" className="text-white icon" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} size="2x" /></a>
                  </div>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? <Link className="text-white-50 fw-bold" to="/register">Register</Link> now.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login;