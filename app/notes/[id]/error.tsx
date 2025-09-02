"use client";

interface ErrorDetailsProps {
  error: Error;
}

const ErrorDetails = ({ error }: ErrorDetailsProps) => {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
    </div>
  );
};

export default ErrorDetails;
