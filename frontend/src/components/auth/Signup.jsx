import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Navbar from '../shared/Navbar';

import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from "../../redux/userSlice" // update path accordingly

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loading = useSelector((state) => state.auth.loading);

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true)); // set loading true in redux

    try {
      const res = await axios.post(
        'http://localhost:3000/api/v1/users/register',
        {
          fullname: input.fullname,
          email: input.email,
          phonenumber: input.phoneNumber,
          password: input.password,
          role: input.role,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        
        // reset form fields
        setInput({
          fullname: '',
          email: '',
          phoneNumber: '',
          password: '',
          role: '',
        });

        dispatch(setUser(null)); // or setUser(res.data.user) if you want to auto-login after signup
        
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false)); // reset loading
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-6 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="9876543210"
              required
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              required
            />
          </div>

          <div className="my-4">
            <Label className="block mb-2">Select Role</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={input.role === 'buyer'}
                  onChange={changeEventHandler}
                />
                <span>Buyer</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={input.role === 'admin'}
                  onChange={changeEventHandler}
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-green-700">
              Signup
            </Button>
          )}

          <span className="flex text-sm justify-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 ml-1">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
