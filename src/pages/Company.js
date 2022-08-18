import './Company.css';
import Layout from '../components/layout';
import { StarIcon } from '@heroicons/react/outline';
import Rating from '../components/rating';
import CharacteristicRating from '../components/characteristicRating';
import TraditionalCharacteristic from '../components/traditionalCharacteristic';
import { singleCompany } from '../apis/companyAPI';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const experienceRatings = [
  { name: 'Work-life balance' },
  { name: 'Remote flexibility' },
  { name: 'Diversity' },
  { name: 'Inclusive environment' },
  { name: 'Trust' },
  { name: 'Young & fun environment' },
];

const personalRatings = [
  { name: 'Growth opportunies' },
  { name: 'Mentorship' },
  { name: 'Work Satisfaction' },
  { name: 'Team support' },
  { name: 'Managerial Support' },
  { name: 'Collaborative environment' },
  { name: 'Diverse leadership' },
];

const traditionalRatings = [
  { name: 'Compensation' },
  { name: 'Benefits & perks' },
  { name: 'Personal/ vacation time' },
  { name: 'Job security' },
  { name: 'Executive team' },
  { name: 'Interview process' },
];

const Company = () => {
  const [companyInfo, setCompanyInfo] = useState({});
  const params = useParams();

  const getCompanyInfo = async () => {
    const companyID = params.id;
    const companyData = await singleCompany(companyID);
    setCompanyInfo(companyData);
    console.log("company data", companyInfo)
  }

  useEffect(() => {
    getCompanyInfo();
  },[]);

  return (
    <Layout>
      <div className="company-container">
        <div className="company-card">
          <img src="/images/company-image.svg" className="company-image" />
          <p className="link-about-company">About this company</p>    
        </div>
        <div className="company-information-container">
          <p className="company-name-section">{companyInfo.companydb?.name}</p>
          <div className="company-rating">
            <div className="company-rating-stars">
              <Rating rating={companyInfo.average_rating}/>
            </div>
            <div className="company-rating-text">
              <p>{companyInfo.average_rating}/5 average rating</p>
            </div>
          </div>
          <div className="company-review-total">
            <p>Total Reviews: {companyInfo.total_reviews}</p>
          </div>
          <button type="button" className="rate-this-company-button">
            <StarIcon className="icon-button-rate-company" aria-hidden="true" />
            Rate this company
          </button>
        </div>
      </div>
      <div className="cultural-characteristics-container">
        <h1 className="title-characteristics">Cultural workplace characteristics</h1>
        <CharacteristicRating characteristic="WORKPLACE EXPERIENCE" ratings={experienceRatings} />
        <CharacteristicRating characteristic="PERSONAL GROWTH" ratings={personalRatings} />
      </div>
      <TraditionalCharacteristic ratings={traditionalRatings}/>
      <div className="question-company mt-14 sm:mt-16 sm:mt-20">
        <h1 className="title-question-section">Do you work at IBM North America?</h1>
        <p className="text-question-section">By honestly rating your company, you can help other job seekers.  Our system is completely anoymous after email verification.</p>
        <button type="button" className="rate-this-company-button">
          <StarIcon className="icon-button-rate-company" aria-hidden="true" />
          Rate this company
        </button>
      </div>
    </Layout>
  );
}

export default Company;
