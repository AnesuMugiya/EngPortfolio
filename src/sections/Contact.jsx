import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    projectType: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateEmail = (email) => {
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }

    // Additional checks
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    
    const [localPart, domain] = parts;
    
    // Check local part (before @)
    if (localPart.length === 0 || localPart.length > 64) return false;
    if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
    if (localPart.includes('..')) return false;
    
    // Check domain part (after @)
    if (domain.length === 0 || domain.length > 255) return false;
    if (domain.startsWith('-') || domain.endsWith('-')) return false;
    if (domain.startsWith('.') || domain.endsWith('.') || !domain.includes('.')) return false;
    if (domain.includes('..')) return false;
    
    // Check if domain has valid TLD
    const domainParts = domain.split('.');
    if (domainParts.length < 2) return false;
    
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2 || tld.length > 6) return false;
    if (!/^[a-zA-Z]+$/.test(tld)) return false;
    
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Project type validation
    if (!formData.projectType.trim()) {
      newErrors.projectType = 'Project type is required';
    }

    // Enhanced email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async () => {
    console.log('Submit clicked, validating form...');
    
    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    console.log('Form is valid, submitting...');
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Method 1: Using Formspree (replace with your actual endpoint)
      const formspreeResponse = await fetch('https://formspree.io/f/xanbgpbr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          project_type: formData.projectType,
          email: formData.email,
          _replyto: formData.email,
          _subject: `New Contact Form Submission from ${formData.name}`,
          message: `Name: ${formData.name}\nProject Type: ${formData.projectType}\nEmail: ${formData.email}`
        }),
      });

      if (formspreeResponse.ok) {
        console.log('Email sent successfully via Formspree');
        setSubmitStatus('success');
        setFormData({ name: '', projectType: '', email: '' });
      } else {
        console.log('Formspree failed, trying backup method...');
        
        // Method 2: Backup - mailto link (opens user's email client)
        const subject = encodeURIComponent(`New Contact Form Submission from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nProject Type: ${formData.projectType}\nEmail: ${formData.email}\n\nPlease reply to: ${formData.email}`);
        const mailtoLink = `mailto:anesutmugiya@gmail.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        setSubmitStatus('mailto');
        setFormData({ name: '', projectType: '', email: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Fallback: Open mailto link
      const subject = encodeURIComponent(`New Contact Form Submission from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nProject Type: ${formData.projectType}\nEmail: ${formData.email}\n\nPlease reply to: ${formData.email}`);
      const mailtoLink = `mailto:anesutmugiya@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      setSubmitStatus('mailto');
      setFormData({ name: '', projectType: '', email: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.projectType.trim() && 
           formData.email.trim() && 
           validateEmail(formData.email.trim()) &&
           Object.keys(errors).length === 0;
  };

  return (
    <section id="contact" className="bg-black">
      <div className="min-h-screen flex items-center justify-center p-8 text-white">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
          
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-extrabold leading-tight">
              Let's get <br /> started.
            </h1>
            <p className="mt-4 text-sm font-medium tracking-widest text-gray-400 uppercase">
              Contact Form
            </p>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-baseline gap-2 text-lg leading-relaxed">
              
              <span className="text-3xl font-bold">My name is</span>
              <div className="min-w-[160px] flex-1 relative">
                <input 
                  type="text" 
                  placeholder="JOHN SMITH" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onBlur={() => validateForm()}
                  className={`w-full px-2 py-1 font-medium border-b-2 rounded-none ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } focus:border-white outline-none placeholder-gray-500 bg-transparent transition-colors`}
                />
                {errors.name && (
                  <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-medium whitespace-nowrap">
                    {errors.name}
                  </div>
                )}
              </div>

              <span className="text-3xl font-bold">and I have a</span>
              <div className="min-w-[200px] flex-1 relative">
                <input 
                  type="text" 
                  placeholder="WEBSITE OR APP DESIGN OR ETC" 
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  onBlur={() => validateForm()}
                  className={`w-full px-2 py-1 font-medium border-b-2 rounded-none ${
                    errors.projectType ? 'border-red-500' : 'border-gray-600'
                  } focus:border-white outline-none placeholder-gray-500 bg-transparent transition-colors`}
                />
                {errors.projectType && (
                  <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-medium whitespace-nowrap">
                    {errors.projectType}
                  </div>
                )}
              </div>

              <span className="text-3xl font-bold">that needs help. You can reach me at</span>
              <div className="min-w-[220px] flex-1 relative">
                <input 
                  type="email" 
                  placeholder="YOUR EMAIL ADDRESS" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => validateForm()}
                  className={`w-full px-2 py-1 font-medium border-b-2 rounded-none ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } focus:border-white outline-none placeholder-gray-500 bg-transparent transition-colors`}
                />
                {errors.email && (
                  <div className="absolute -bottom-6 left-0 text-red-400 text-sm font-medium whitespace-nowrap">
                    {errors.email}
                  </div>
                )}
              </div>

              <span className="text-3xl font-bold">to get things started.</span>
            </div>

            <div className="mt-12">
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-900/30 border border-green-500 rounded-md text-green-400 text-sm">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'mailto' && (
                <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500 rounded-md text-blue-400 text-sm">
                  ✓ Your email client should open. Please send the email from there.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-md text-red-400 text-sm">
                  ✗ Failed to send message. Please try again or email me directly at anesutmugiya@gmail.com
                </div>
              )}

              <button 
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`px-6 py-3 font-semibold tracking-widest rounded-md transition-all duration-200 ${
                  isFormValid() && !isSubmitting
                    ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 transform cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? '— SENDING...' : '— SEND INFO'}
              </button>
            </div>

            {/* Debug info - remove in production */}
            <div className="mt-4 text-xs text-gray-500">
              <p>Debug: Form Valid = {isFormValid().toString()}</p>
              <p>Errors: {JSON.stringify(errors)}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}