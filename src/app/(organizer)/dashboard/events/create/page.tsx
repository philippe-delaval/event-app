"use client";

import { useState } from "react";
import { createEventAction } from "./create-event.action";


export default function CreateEventPage() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setMessage("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await createEventAction(null, formData);

    setIsSubmitting(false);

    if (result?.success) {
      setSuccess(true);
      setMessage(result.message || "Événement créé avec succès !");
      // Redirect is handled in action, but we can also do it here if needed
    } else {
      setSuccess(false);
      setMessage(result?.message || "Une erreur est survenue.");
      if (result?.errors) {
        setErrors(result.errors);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Créer un nouvel événement</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom de l&apos;événement
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.name && (
            <p className="text-alert text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.description && (
            <p className="text-alert text-sm mt-1">{errors.description[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="begin_date" className="block text-sm font-medium text-gray-700">
            Date de début
          </label>
          <input
            type="datetime-local"
            name="begin_date"
            id="begin_date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.begin_date && (
            <p className="text-alert text-sm mt-1">{errors.begin_date[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
            Date de fin
          </label>
          <input
            type="datetime-local"
            name="end_date"
            id="end_date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.end_date && (
            <p className="text-alert text-sm mt-1">{errors.end_date[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Lieu
          </label>
          <input
            type="text"
            name="location"
            id="location"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.location && (
            <p className="text-alert text-sm mt-1">{errors.location[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="max_capacity" className="block text-sm font-medium text-gray-700">
            Capacité maximale
          </label>
          <input
            type="number"
            name="max_capacity"
            id="max_capacity"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.max_capacity && (
            <p className="text-alert text-sm mt-1">{errors.max_capacity[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
            URL de l&apos;image
          </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            placeholder="https://example.com/image.jpg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.image_url && (
            <p className="text-alert text-sm mt-1">{errors.image_url[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            id="latitude"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.latitude && (
            <p className="text-alert text-sm mt-1">{errors.latitude[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            id="longitude"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
          {errors?.longitude && (
            <p className="text-alert text-sm mt-1">{errors.longitude[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            name="status"
            id="status"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          >
            <option value="DRAFT">Brouillon</option>
            <option value="PUBLISHED">Publié</option>
            <option value="CANCELLED">Annulé</option>
          </select>
          {errors?.status && (
            <p className="text-alert text-sm mt-1">{errors.status[0]}</p>
          )}
        </div>

        {message && (
          <p className={`text-sm ${success ? "text-green-500" : "text-alert"}`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Création..." : "Créer l'événement"}
        </button>
      </form>
    </div>
  );
}
