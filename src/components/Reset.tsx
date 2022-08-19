import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <section className="vh-90 gradient-custom reset">
      <div className="container py-5 h-90 rounded-lg">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" >
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <div className="form-outline form-white mb-4">
                    <input type="email" value={email} id="typeEmailX" onChange={(e) => setEmail(e.target.value)}
                      className="form-control text-white form-control-lg bg-dark" placeholder="Email" />
                  </div>
                  <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={() => sendPasswordResetEmail(auth,email)}>Send password reset email</button>

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
export default Reset;