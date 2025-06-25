import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const SendParcel = () => {
  const warehouses = useLoaderData(); // Getting all warehouses from loader
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  const type = watch('type'); // Watching parcel type (document/non-document)
  const senderRegion = watch('senderRegion');
  const receiverRegion = watch('receiverRegion');

  // Filter warehouses by selected region
  const getWarehousesByRegion = (region) => {
    return warehouses.filter(w => w.region === region);
  };

  // Calculate delivery cost based on parcel type and weight
  const calculateCost = (type, weight) => {
    let baseCost = type === 'document' ? 100 : 150;
    if (type === 'non-document' && weight) {
      baseCost += parseFloat(weight) * 20;
    }
    return baseCost;
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    const cost = calculateCost(data.type, data.weight);
    Swal.fire({
      title: `Estimated Cost: ৳${cost}`,
      text: 'Do you want to confirm the booking?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Booked!', 'Your parcel has been booked.', 'success');
        reset();
      }
    });
  };

  // Unique region list from warehouse data
  const regions = [...new Set(warehouses.map((w) => w.region))];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Add Parcel</h1>
      <p className="text-md text-slate-500 mb-6">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* --- Parcel Information Section --- */}
        <fieldset className="border-t border-gray-300 pt-4">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2">
              <input type="radio" value="document" {...register('type', { required: true })} />
              <span className="text-sm font-medium text-gray-700">Document</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" value="non-document" {...register('type', { required: true })} />
              <span className="text-sm font-medium text-gray-700">Not-Document</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="label">Parcel Name</label>
              <input
                type="text"
                {...register('title', { required: true })}
                placeholder="Parcel Name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">Parcel Weight (KG)</label>
              <input
                type="number"
                {...register('weight')}
                placeholder="Parcel Weight (KG)"
                className="input input-bordered w-full"
                disabled={type === 'document'}
              />
            </div>
          </div>
        </fieldset>

        {/* --- Sender and Receiver Info Section --- */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* --- Sender Info --- */}
          <fieldset>
            <legend className="font-bold text-slate-800 mb-4">Sender Details</legend>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label">Sender Name</label>
                <input {...register('senderName', { required: true })} placeholder="Sender Name" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Your Region</label>
                <select {...register('senderRegion', { required: true })} className="select w-full">
                  <option value="">Select your region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Sender Pickup Warehouse</label>
                <select {...register('senderCenter', { required: true })} className="select w-full">
                  <option value="">Select warehouse</option>
                  {getWarehousesByRegion(senderRegion).map((w, idx) => (
                    <option key={idx} value={w.district}>{w.district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Pickup Address</label>
                <input {...register('senderAddress', { required: true })} placeholder="Pickup Address" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Sender Contact No</label>
                <input {...register('senderContact', { required: true })} placeholder="Sender Contact No" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Pickup Instruction</label>
                <textarea {...register('pickupInstruction', { required: true })} placeholder="Pickup Instruction" className="textarea textarea-bordered w-full"></textarea>
              </div>
            </div>
          </fieldset>

          {/* --- Receiver Info --- */}
          <fieldset>
            <legend className="font-bold text-slate-800 mb-4">Receiver Details</legend>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label">Receiver Name</label>
                <input {...register('receiverName', { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Receiver Region</label>
                <select {...register('receiverRegion', { required: true })} className="select w-full">
                  <option value="">Select region</option>
                  {regions.map((r, idx) => (
                    <option key={idx} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Receiver Delivery Warehouse</label>
                <select {...register('receiverCenter', { required: true })} className="select w-full">
                  <option value="">Select warehouse</option>
                  {getWarehousesByRegion(receiverRegion).map((w, idx) => (
                    <option key={idx} value={w.district}>{w.district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Receiver Address</label>
                <input {...register('receiverAddress', { required: true })} placeholder="Receiver Address" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Receiver Contact No</label>
                <input {...register('receiverContact', { required: true })} placeholder="Receiver Contact No" className="input input-bordered w-full" />
              </div>

              <div>
                <label className="label">Delivery Instruction</label>
                <textarea {...register('deliveryInstruction', { required: true })} placeholder="Delivery Instruction" className="textarea textarea-bordered w-full"></textarea>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Pickup Time Note */}
        <p className="text-sm text-slate-500 italic">* Pickup Time: 4pm–7pm Approx.</p>

        {/* Submit Button */}
        <button type="submit" className="btn btn-accent mt-4 w-full md:w-auto">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
