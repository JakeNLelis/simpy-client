function NotFound() {
  return (
    <div className="notFound">
      <h1 className="notFound__title">404</h1>
      <div className="notFound__divider"></div>
      <p className="notFound__heading">Page Not Found</p>
      <p className="notFound__description">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="notFound__actions">
        <a href="/" className="notFound__btn notFound__btn--primary">
          Return Home
        </a>
        <a href="/" className="notFound__btn notFound__btn--secondary">
          Contact support
        </a>
      </div>
    </div>
  );
}

export default NotFound;
