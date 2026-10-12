import { ServiceItem, FleetItem } from '../types';
import { Language } from '../i18n/translations';
import blueTouristerImage from '../assets/images/blue_tourister_bus_1791698150659.jpg';
import greenMahindraImage from '../assets/images/green_mahindra_vehicle_1791698162847.jpg';
import heroTravelBusImage from '../assets/images/hero_travel_bus_1791694538521.jpg';
import omniVanImage from '../assets/images/omni_passenger_van_1791698139750.jpg';
import schoolBusServiceImage from '../assets/images/school_bus_service_1791694550958.jpg';
import taveraImage from '../assets/images/tavera_passenger_suv_1791698173407.jpg';
import touristTravelServiceImage from '../assets/images/tourist_travel_service_1791694565229.jpg';

export const HERO_IMAGE = heroTravelBusImage;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'bhavans-school-transport',
    name: 'Bhavans School Transportation',
    slug: 'bhavans-school-transportation',
    image: schoolBusServiceImage,
    shortDescription: 'Dedicated daily pick-up and drop-off transportation exclusively for students of Bhavans School.',
    fullDescription: 'SV Travels provides structured, punctual daily commuting routes arranged exclusively for students attending Bhavans School. Our drivers follow verified schedules to ensure student safety, punctual arrival, and orderly return every school day.',
    suitableUseCases: [
      'Daily morning pickup and afternoon return routes for Bhavans School students',
      'Structured semester and academic-year commute arrangements',
      'Dedicated stops mapped for student convenience and punctuality'
    ],
    vehicleOptions: [
      'Blue Tourister (22-seater)',
      'Green Mahindra vehicle (25-seater)',
      'Omni van (capacity to be confirmed)'
    ],
    bookingInfo: 'Exclusively available for students of Bhavans School. Not offered for other schools. Enquiries are submitted for route coordination; this service does not imply an official institutional affiliation with Bhavans School.',
    isBhavansExclusive: true
  },
  {
    id: 'school-trips-tours',
    name: 'School Trips and Educational Tours',
    slug: 'school-trips-and-educational-tours',
    image: touristTravelServiceImage,
    shortDescription: 'Safe group transportation for educational field trips, science exhibitions, museum visits, and student excursions.',
    fullDescription: 'Coordinated transportation logistics for educational tours, historical heritage excursions, science centre visits, and inter-school academic competitions. Open to educational batches and student groups seeking reliable travel.',
    suitableUseCases: [
      'Single-day educational visits and science museum tours',
      'Interschool sports competitions and cultural events',
      'Field study trips and student excursion programs'
    ],
    vehicleOptions: [
      'Green Mahindra vehicle (25-seater)',
      'Blue Tourister (22-seater)',
      'Tavera (8-seater for staff/small groups)'
    ],
    bookingInfo: 'Available for schools, colleges, and student groups generally. Advance enquiry recommended to align itinerary stops and route requirements.'
  },
  {
    id: 'tourist-travel',
    name: 'Tourist Travel',
    slug: 'tourist-travel',
    image: heroTravelBusImage,
    shortDescription: 'Comfortable passenger vehicles for sightseeing itineraries, family vacations, pilgrimage tours, and group travel.',
    fullDescription: 'Explore regional tourist spots, pilgrimage temples, coastal destinations, and hill stations with clean, dependable passenger vehicles. SV Travels caters to family groups and travel parties looking for comfortable seating and courteous drivers.',
    suitableUseCases: [
      'Family vacation road trips and sightseeing packages',
      'Pilgrimage trips and temple circuit visits',
      'Weekend group tours and outstation leisure trips'
    ],
    vehicleOptions: [
      'Green Mahindra vehicle (25-seater)',
      'Blue Tourister (22-seater)',
      'Tavera (8-seater)',
      'Omni van'
    ],
    bookingInfo: 'Both one-way transfers and round-trip packages available. Detailed route and stop requirements can be shared during enquiry.'
  },
  {
    id: 'local-outstation',
    name: 'Local and Outstation Travel',
    slug: 'local-and-outstation-travel',
    image: taveraImage,
    shortDescription: 'Point-to-point transfers for airport pickups, family functions, social events, and intercity journeys.',
    fullDescription: 'From punctual airport pick-and-drops across Chennai to attending wedding celebrations or traveling to outstation districts, SV Travels offers point-to-point and round-trip travel hires keeping your group together comfortably.',
    suitableUseCases: [
      'Chennai airport and railway terminal passenger transfers',
      'Family gatherings, weddings, and social functions',
      'Intercity outstation journeys from Chennai'
    ],
    vehicleOptions: [
      'Tavera (8-seater)',
      'Omni van',
      'Blue Tourister (22-seater)',
      'Green Mahindra vehicle (25-seater)'
    ],
    bookingInfo: 'Enquiries accepted for same-day local hires as well as multi-day outstation trips. Pickup and drop locations can be customized.'
  }
];

export const FLEET_DATA: FleetItem[] = [
  {
    id: 'fleet-omni-van',
    category: 'Omni van',
    name: 'Omni van',
    seatingCapacity: null,
    capacityConfirmed: false,
    capacityLabel: 'Seating capacity to be confirmed',
    image: omniVanImage,
    shortDescription: 'Compact passenger van suitable for small group transfers, local errands, and quick point-to-point journeys.',
    features: [
      'Compact Micro-Van Maneuverability',
      'Sliding Passenger Access Door',
      'Seating capacity to be confirmed upon booking consultation',
      'Suitable for Local City Street Navigation'
    ],
    idealFor: 'Small group local transfers, student pickup routes, and quick city travel.'
  },
  {
    id: 'fleet-blue-tourister',
    category: 'Blue Tourister',
    name: 'Blue Tourister',
    seatingCapacity: 22,
    capacityConfirmed: true,
    capacityLabel: '22-seater',
    image: blueTouristerImage,
    shortDescription: 'Distinctive royal blue 22-seater mini bus with dedicated passenger seating and comfortable highway ride.',
    features: [
      'Confirmed 22 Passenger High-Back Seats',
      'Wide Tinted Passenger Windows',
      'Overhead Hand-Luggage Storage Space',
      'Maintained for School & Sightseeing Trips'
    ],
    idealFor: 'Bhavans school transport batches, educational tours, and tourist groups up to 22 passengers.'
  },
  {
    id: 'fleet-green-mahindra',
    category: 'Green Mahindra vehicle',
    name: 'Green Mahindra vehicle',
    seatingCapacity: 25,
    capacityConfirmed: true,
    capacityLabel: '25-seater',
    image: greenMahindraImage,
    shortDescription: 'Sturdy green 25-seater Mahindra passenger vehicle designed for larger groups, school batches, and excursion travel.',
    features: [
      'Confirmed 25 Passenger Seating Capacity',
      'Spacious Cabin for Larger Batches',
      'Robust Chassis Built for Outstation & Local Highways',
      'Adequate Luggage Space for School & Tour Groups'
    ],
    idealFor: 'Large student groups, school excursions, and tourist groups up to 25 passengers.'
  },
  {
    id: 'fleet-tavera',
    category: 'Tavera',
    name: 'Tavera',
    seatingCapacity: 8,
    capacityConfirmed: true,
    capacityLabel: '8-seater',
    image: taveraImage,
    shortDescription: 'Reliable 8-seater multi-utility passenger vehicle ideal for families, airport runs, and smaller travel parties.',
    features: [
      'Confirmed 8 Passenger Seats',
      'Air-Conditioned Cabin Comfort',
      'Smooth Highway Performance',
      'Flexible Luggage Space for Family Trips'
    ],
    idealFor: 'Family airport transfers, small private group outstation travel, and local Chennai transit up to 8 passengers.'
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Specific Vehicle Categories',
    description: 'Choice of vehicles including our 8-seater Tavera, 22-seater Blue Tourister, 25-seater Green Mahindra vehicle, and Omni van to suit your group count.'
  },
  {
    title: 'Direct Coordinator Support',
    description: 'Every booking enquiry is directly reviewed by SV Travels staff in Chennai to coordinate timing, stops, and vehicle availability.'
  },
  {
    title: 'Dedicated School & Tourist Transit',
    description: 'Specialized arrangements for Bhavans School students alongside educational tour charters and regional tourist travel.'
  },
  {
    title: 'Transparent Enquiry Process',
    description: 'Clear trip parameters, confirmed seating capacities, and direct phone/WhatsApp verification before finalizing.'
  }
];

// Localized Services Generator
export const getLocalizedServices = (lang: Language): ServiceItem[] => {
  if (lang === 'ta') {
    return [
      {
        ...SERVICES_DATA[0],
        name: 'பவன்ஸ் பள்ளி போக்குவரத்து (Bhavans School)',
        shortDescription: 'பவன்ஸ் பள்ளி பயிலும் மாணவர்களுக்காக பிரத்தியேகமாக இயக்கப்படும் தினசரி பள்ளி வாகனப் போக்குவரத்து சேவை.',
        fullDescription: 'எஸ்.வி டிராவல்ஸ் பவன்ஸ் பள்ளி மாணவர்களுக்காக மட்டுமே வடிவமைக்கப்பட்ட நேரக்கட்டுப்பாடு கொண்ட தினசரி பயண வழித்தடங்களை வழங்குகிறது. மாணவர் பாதுகாப்பு, சரியான நேர வருகை மற்றும் ஒழுங்கான பயணத்தை எங்கள் ஓட்டுநர்கள் உறுதி செய்கிறார்கள்.',
        suitableUseCases: [
          'பவன்ஸ் பள்ளி மாணவர்களுக்கான காலை நேர பிக்கப் மற்றும் மாலை நேர டிராப்',
          'பருவமுறை மற்றும் கல்வி ஆண்டுக்கான ஒழுங்கமைக்கப்பட்ட பயண ஏற்பாடு',
          'மாணவர்களின் வசதிக்காக திட்டமிடப்பட்ட நிறுத்தங்கள்'
        ],
        vehicleOptions: [
          'புளூ டூரிஸ்டர் (22 இருக்கைகள்)',
          'கிரீன் மஹிந்திரா வாகனம் (25 இருக்கைகள்)',
          'ஓம்னி வேன் (இருக்கை உறுதி செய்யப்பட உள்ளது)'
        ],
        bookingInfo: 'பவன்ஸ் பள்ளி மாணவர்களுக்கு மட்டுமே பிரத்தியேகமாக கிடைக்கும். பிற பள்ளிகளுக்கு வழங்கப்படுவதில்லை. இந்த சேவை பவன்ஸ் பள்ளியுடன் உத்தியோகபூர்வ நிறுவன தொடர்பைக் குறிக்கவில்லை.'
      },
      {
        ...SERVICES_DATA[1],
        name: 'பள்ளி சுற்றுலா & கல்விப் பயணங்கள்',
        shortDescription: 'அறிவியல் மையங்கள், வரலாற்று களப்பயணங்கள் மற்றும் விளையாட்டு போட்டிகளுக்கான பாதுகாப்பான குழு போக்குவரத்து.',
        fullDescription: 'பள்ளிகள் மற்றும் கல்லூரிகளுக்கான கல்வி சுற்றுலாக்கள், அருங்காட்சியகப் பயணங்கள் மற்றும் மாநில அளவிலான போட்டிகளுக்கான ஒருங்கிணைந்த போக்குவரத்து சேவைகள்.',
        suitableUseCases: [
          'ஒரு நாள் அறிவியல் கூடம் மற்றும் பாரம்பரிய சுற்றுலாக்கள்',
          'பள்ளி மாணவர் விளையாட்டு மற்றும் கலாச்சார போட்டிகள்',
          'கள ஆய்வு பயணங்கள் மற்றும் மாணவர் முகாம்கள்'
        ],
        vehicleOptions: [
          'கிரீன் மஹிந்திரா வாகனம் (25 இருக்கைகள்)',
          'புளூ டூரிஸ்டர் (22 இருக்கைகள்)',
          'டவேரா (8 இருக்கைகள்)'
        ],
        bookingInfo: 'அனைத்து பள்ளிகள் மற்றும் கல்லூரிகளுக்கும் கிடைக்கும். வழித்தடங்கள் மற்றும் நிறுத்தங்களை ஒருங்கிணைக்க முன்கூட்டியே தொடர்பு கொள்ளவும்.'
      },
      {
        ...SERVICES_DATA[2],
        name: 'சுற்றுலாப் பயணங்கள் (Tourist Travel)',
        shortDescription: 'குடும்ப விடுமுறை, ஆன்மீக தரிசனம், மலைவாசஸ்தலங்கள் மற்றும் உல்லாச சுற்றுலாக்களுக்கான வசதியான வாகனங்கள்.',
        fullDescription: 'சுற்றுலா தலங்கள், ஆன்மீக திருத்தலங்கள் மற்றும் கடற்கரை வழித்தடங்களை சுத்தமான மற்றும் நம்பகமான வாகனங்களுடன் கண்டு மகிழுங்கள். குடும்பங்கள் மற்றும் குழுக்களுக்கு ஏற்றது.',
        suitableUseCases: [
          'குடும்ப விடுமுறை சுற்றுலாக்கள் மற்றும் பார்வையிடல் திட்டங்கள்',
          'கோவில் திருத்தல யாத்திரைகள் மற்றும் ஆன்மீகப் பயணங்கள்',
          'வார இறுதி உல்லாச சுற்றுலா மற்றும் விடுமுறை பயணங்கள்'
        ],
        vehicleOptions: [
          'கிரீன் மஹிந்திரா வாகனம் (25 இருக்கைகள்)',
          'புளூ டூரிஸ்டர் (22 இருக்கைகள்)',
          'டவேரா (8 இருக்கைகள்)',
          'ஓம்னி வேன்'
        ],
        bookingInfo: 'ஒரு வழி மற்றும் இரு வழிப் பயண தொகுப்புகள் இரண்டும் கிடைக்கின்றன. வழித்தட விவரங்களை ஆலோசித்து மாற்றியமைக்கலாம்.'
      },
      {
        ...SERVICES_DATA[3],
        name: 'உள்ளூர் & வெளியூர் வாடகை (Outstation)',
        shortDescription: 'விமான நிலைய பிக்கப், திருமண சுபநிகழ்ச்சிகள் மற்றும் பிற மாவட்டங்களுக்கான வெளியூர் பயணங்கள்.',
        fullDescription: 'சென்னையில் சரியான நேர விமான நிலைய மாற்றங்கள் முதல் குடும்ப விழாக்கள் அல்லது பிற மாவட்ட வெளியூர் பயணங்கள் வரை உங்கள் குழுவினர் ஒன்றாக பயணிக்க சிறந்த வாகனங்கள்.',
        suitableUseCases: [
          'சென்னை விமான நிலையம் மற்றும் ரயில் நிலைய பயணிகள் பிக்கப்/டிராப்',
          'திருமண விழாக்கள் மற்றும் குடும்ப சுபநிகழ்ச்சி போக்குவரத்து',
          'சென்னையிலிருந்து பிற மாவட்டங்களுக்கான வெளியூர் பயணம்'
        ],
        vehicleOptions: [
          'டவேரா (8 இருக்கைகள்)',
          'ஓம்னி வேன்',
          'புளூ டூரிஸ்டர் (22 இருக்கைகள்)',
          'கிரீன் மஹிந்திரா வாகனம் (25 இருக்கைகள்)'
        ],
        bookingInfo: 'ஒரே நாள் உள்ளூர் பயணங்கள் மற்றும் பல நாள் வெளியூர் பயணங்களுக்கு முன்பதிவு விசாரணைகள் வரவேற்கப்படுகின்றன.'
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        ...SERVICES_DATA[0],
        name: 'भवांस स्कूल परिवहन (Bhavans School)',
        shortDescription: 'भवांस स्कूल के छात्रों के लिए विशेष रूप से दैनिक स्कूल आवागमन और पिक-अप/ड्रॉप सेवा।',
        fullDescription: 'एसवी ट्रैवल्स भवांस स्कूल में पढ़ने वाले छात्रों के लिए विशेष दैनिक आवागमन मार्ग प्रदान करता है। हमारे चालक छात्रों की सुरक्षा, समय की पाबंदी और व्यवस्थित वापसी सुनिश्चित करते हैं।',
        suitableUseCases: [
          'भवांस स्कूल के छात्रों के लिए दैनिक सुबह पिकअप एवं दोपहर ड्रॉप',
          'सत्र एवं शैक्षणिक वर्ष के लिए नियमित यात्रा व्यवस्था',
          'छात्रों की सुविधा के अनुसार निर्धारित स्टॉपेज'
        ],
        vehicleOptions: [
          'ब्लू टूरिस्टर (22 सीटें)',
          'ग्रीन महिंद्रा वाहन (25 सीटें)',
          'ओमनी वैन (क्षमता पुष्ट की जानी है)'
        ],
        bookingInfo: 'यह सेवा केवल भवांस स्कूल के छात्रों के लिए उपलब्ध है। अन्य स्कूलों के लिए नहीं है। यह सेवा भवांस स्कूल के साथ आधिकारिक संस्थागत संबद्धता का संकेत नहीं देती है।'
      },
      {
        ...SERVICES_DATA[1],
        name: 'स्कूल टूर एवं शैक्षिक भ्रमण',
        shortDescription: 'विज्ञान केंद्रों, संग्रहालयों, खेल प्रतियोगिताओं और शैक्षणिक भ्रमण के लिए सुरक्षित समूह यात्रा।',
        fullDescription: 'स्कूलों एवं कॉलेजों के लिए शैक्षिक टूर, ऐतिहासिक स्थलों की यात्रा और प्रतियोगिताओं हेतु सुव्यवस्थित परिवहन व्यवस्था।',
        suitableUseCases: [
          'एकदिवसीय विज्ञान केंद्र एवं संग्रहालय भ्रमण',
          'अंतर-स्कूल खेलकूद एवं सांस्कृतिक प्रतियोगिताएं',
          'शैक्षणिक अध्ययन यात्राएं एवं छात्र कैंप'
        ],
        vehicleOptions: [
          'ग्रीन महिंद्रा वाहन (25 सीटें)',
          'ब्लू टूरिस्टर (22 सीटें)',
          'टवेरा (8 सीटें)'
        ],
        bookingInfo: 'सभी स्कूलों और छात्र समूहों के लिए उपलब्ध। यात्रा कार्यक्रम और ठहराव समन्वय के लिए अग्रिम पूछताछ की सिफारिश की जाती है।'
      },
      {
        ...SERVICES_DATA[2],
        name: 'पर्यटन यात्रा (Tourist Travel)',
        shortDescription: 'दर्शनीय स्थलों, पारिवारिक छुट्टियों, तीर्थ यात्राओं और समूह पर्यटन के लिए आरामदायक वाहन।',
        fullDescription: 'क्षेत्रीय पर्यटन स्थलों, मंदिरों, तटीय क्षेत्रों और हिल स्टेशनों की आरामदायक यात्रा। परिवारों और पर्यटन दलों के लिए स्वच्छ वाहन एवं शिष्ट चालक।',
        suitableUseCases: [
          'पारिवारिक छुट्टियां एवं दर्शनीय स्थल भ्रमण',
          'तीर्थ यात्राएं एवं मंदिर दर्शन पैकेज',
          'सप्ताहांत समूह टूर एवं आउटस्टेशन यात्रा'
        ],
        vehicleOptions: [
          'ग्रीन महिंद्रा वाहन (25 सीटें)',
          'ब्लू टूरिस्टर (22 सीटें)',
          'टवेरा (8 सीटें)',
          'ओमनी वैन'
        ],
        bookingInfo: 'एकतरफा और राउंड-ट्रिप दोनों पैकेज उपलब्ध हैं। यात्रा मार्ग और समय को आपकी आवश्यकतानुसार अनुकूलित किया जा सकता है।'
      },
      {
        ...SERVICES_DATA[3],
        name: 'स्थानीय एवं आउटस्टेशन यात्रा',
        shortDescription: 'एयरपोर्ट पिकअप, पारिवारिक समारोहों, शादियों और अंतर-शहरी आउटस्टेशन यात्रा हेतु सेवा।',
        fullDescription: 'चेन्नई हवाई अड्डे से समयबद्ध आवागमन से लेकर पारिवारिक आयोजनों या अन्य शहरों की यात्रा तक, समूह में आरामदायक यात्रा की संपूर्ण सुविधा।',
        suitableUseCases: [
          'चेन्नई एयरपोर्ट और रेलवे स्टेशन यात्री आवागमन',
          'विवाह समारोह एवं पारिवारिक उत्सव परिवहन',
          'चेन्नई से अंतर-शहरी आउटस्टेशन यात्राएं'
        ],
        vehicleOptions: [
          'टवेरा (8 सीटें)',
          'ओमनी वैन',
          'ब्लू टूरिस्टर (22 सीटें)',
          'ग्रीन महिंद्रा वाहन (25 सीटें)'
        ],
        bookingInfo: 'स्थानीय दिन के किराए और बहु-दिवसीय आउटस्टेशन यात्रा दोनों के लिए पूछताछ स्वीकार की जाती है।'
      }
    ];
  }

  return SERVICES_DATA;
};

// Localized Fleet Generator
export const getLocalizedFleet = (lang: Language): FleetItem[] => {
  if (lang === 'ta') {
    return [
      {
        ...FLEET_DATA[0],
        capacityLabel: 'இருக்கை அளவு உறுதி செய்யப்பட உள்ளது',
        shortDescription: 'சிறிய குழுக்கள், உள்ளூர் பயணங்கள் மற்றும் பள்ளி பிக்கப் பணிகளுக்கு ஏற்ற சிறிய பயணிகள் வேன்.',
        features: [
          'குறுகிய தெருக்களில் எளிதாக செல்லும் வடிவம்',
          'ஸ்லைடிங் பயணிகள் கதவு',
          'இருக்கை கொள்ளளவு ஆலோசனைக்குப் பின் உறுதி செய்யப்படும்',
          'உள்ளூர் சென்னை பயணங்களுக்கு சிறந்தது'
        ],
        idealFor: 'சிறிய குழு உள்ளூர் பயணம், பள்ளி பிக்கப் மற்றும் அவசர பயணங்கள்.'
      },
      {
        ...FLEET_DATA[1],
        capacityLabel: '22-இருக்கைகள்',
        shortDescription: '22 பயணிகள் அமரக்கூடிய கம்பீரமான நீல நிற மினி பஸ்; பள்ளி மற்றும் சுற்றுலாப் பயணங்களுக்கு ஏற்றது.',
        features: [
          'உறுதி செய்யப்பட்ட 22 வசதியான இருக்கைகள்',
          'பரந்த கண்ணாடிகள் மற்றும் குளிர்ச்சி பாதுகாப்பு',
          'கைப்பை வைக்கும் இடவசதி',
          'பள்ளி & சுற்றுலாவுக்கு தொடர்ந்து பராமரிக்கப்படும் வாகனம்'
        ],
        idealFor: 'பவன்ஸ் பள்ளி மாணவர்கள், கல்வி சுற்றுலாக்கள் மற்றும் 22 பயணிகள் வரை கொண்ட குழுக்கள்.'
      },
      {
        ...FLEET_DATA[2],
        capacityLabel: '25-இருக்கைகள்',
        shortDescription: '25 பயணிகள் செல்லக்கூடிய வலுவான பச்சை நிற மஹிந்திரா வாகனம்; பெரிய குழுக்கள் மற்றும் நெடுஞ்சாலைப் பயணங்களுக்கு சிறந்தது.',
        features: [
          'உறுதி செய்யப்பட்ட 25 இருக்கை கொள்ளளவு',
          'அதிக எண்ணிக்கையிலான மாணவர்களுக்கு விசாலமான அறை',
          'நெடுஞ்சாலை பயணங்களுக்கு ஏற்ற உறுதியான சேஸிஸ்',
          'சுற்றுலா மற்றும் பள்ளி லக்கேஜ் வைக்கும் இடவசதி'
        ],
        idealFor: 'பெரிய மாணவர் குழுக்கள், பள்ளி கல்விச் சுற்றுலா மற்றும் 25 பயணிகள் வரை கொண்ட சுற்றுலா குழுக்கள்.'
      },
      {
        ...FLEET_DATA[3],
        capacityLabel: '8-இருக்கைகள்',
        shortDescription: 'குடும்பங்கள், விமான நிலைய பயணங்கள் மற்றும் சிறிய குழுக்களுக்கு மிகவும் நம்பகமான 8-இருக்கை டவேரா வாகனம்.',
        features: [
          'உறுதி செய்யப்பட்ட 8 பயணிகள் இருக்கைகள்',
          'குளிர்சாதன (AC) வசதியுடன் கூடிய கேபின்',
          'மென்மையான நெடுஞ்சாலை இயக்கம்',
          'குடும்ப பயணங்களுக்கான லக்கேஜ் இடம்'
        ],
        idealFor: 'குடும்ப விமான நிலைய பயணம், சிறிய தனிநபர் வெளியூர் பயணம் மற்றும் உள்ளூர் சென்னை பயணம்.'
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        ...FLEET_DATA[0],
        capacityLabel: 'क्षमता पुष्टि की जानी है',
        shortDescription: 'छोटे समूहों, स्थानीय आवागमन और त्वरित यात्राओं के लिए उपयुक्त कॉम्पैक्ट ओमनी वैन।',
        features: [
          'शहरी गलियों में सुगम आवागमन हेतु कॉम्पैक्ट डिजाइन',
          'स्लाइडिंग पैसेंजर डोर',
          'बैठने की क्षमता पूछताछ के बाद तय की जाएगी',
          'स्थानीय शहर आवागमन के लिए उपयुक्त'
        ],
        idealFor: 'छोटे समूहों का स्थानीय आवागमन, छात्र पिकअप और स्थानीय शहर यात्रा।'
      },
      {
        ...FLEET_DATA[1],
        capacityLabel: '22-सीटर',
        shortDescription: 'आकर्षक रॉयल ब्लू 22-सीटर मिनी बस, जो स्कूल तथा दर्शनीय पर्यटन यात्रा के लिए आरामदायक है।',
        features: [
          'पुष्ट 22 आरामदायक हाई-बैक सीटें',
          'चौड़ी खिड़कियां',
          'हैंड-बैगेज रखने की पर्याप्त जगह',
          'स्कूल और पर्यटन यात्रा के लिए नियमित रूप से अनुरक्षित'
        ],
        idealFor: 'भवांस स्कूल के छात्र, शैक्षणिक टूर और 22 यात्रियों तक के पर्यटक दल।'
      },
      {
        ...FLEET_DATA[2],
        capacityLabel: '25-सीटर',
        shortDescription: 'मजबूत ग्रीन महिंद्रा 25-सीटर वाहन, जो बड़े समूहों, स्कूल दलों और आउटस्टेशन यात्रा के लिए सर्वोत्तम है।',
        features: [
          'पुष्ट 25 यात्रियों के बैठने की क्षमता',
          'बड़े समूहों के लिए विस्तृत केबिन',
          'राजमार्गों के लिए मजबूत चेसिस',
          'सामान रखने की पर्याप्त जगह'
        ],
        idealFor: 'बड़े छात्र दल, स्कूल टूर और 25 यात्रियों तक के पर्यटन समूह।'
      },
      {
        ...FLEET_DATA[3],
        capacityLabel: '8-सीटर',
        shortDescription: 'विश्वसनीय 8-सीटर मल्टी-यूटिलिटी टवेरा वाहन, जो परिवारों, एयरपोर्ट ट्रांसफर और छोटी यात्राओं के लिए आदर्श है।',
        features: [
          'पुष्ट 8 यात्री सीटें',
          'वातानुकूलित (AC) आरामदायक केबिन',
          'सुगम राजमार्ग प्रदर्शन',
          'पारिवारिक सामान रखने की सुविधा'
        ],
        idealFor: 'पारिवारिक एयरपोर्ट ट्रांसफर, निजी आउटस्टेशन यात्रा और 8 यात्रियों तक स्थानीय यात्रा।'
      }
    ];
  }

  return FLEET_DATA;
};

// Localized Why Choose Us Generator
export const getLocalizedWhyChooseUs = (lang: Language) => {
  if (lang === 'ta') {
    return [
      {
        title: 'குறிப்பிட்ட வாகனத் தேர்வுகள்',
        description: 'எங்கள் 8-இருக்கை டவேரா, 22-இருக்கை புளூ டூரிஸ்டர், 25-இருக்கை கிரீன் மஹிந்திரா வாகனம் மற்றும் ஓம்னி வேன் மூலம் உங்கள் குழு எண்ணிக்கைக்கு ஏற்ப வாகனம் தேர்வு செய்யலாம்.'
      },
      {
        title: 'நேரடி ஒருங்கிணைப்பாளர் ஆதரவு',
        description: 'ஒவ்வொரு முன்பதிவு விசாரணையும் சென்னையில் உள்ள எஸ்.வி டிராவல்ஸ் பணியாளர்களால் நேரடியாக மதிப்பாய்வு செய்யப்பட்டு நேரம் மற்றும் வாகன இருப்பு ஒருங்கிணைக்கப்படுகிறது.'
      },
      {
        title: 'பள்ளி & சுற்றுலா பிரத்யேக போக்குவரத்து',
        description: 'பவன்ஸ் பள்ளி மாணவர்களுக்கான தினசரி போக்குவரத்து மற்றும் கல்விச் சுற்றுலா, சுற்றுலா பயணங்களுக்கான நம்பகமான ஏற்பாடுகள்.'
      },
      {
        title: 'வெளிப்படையான விசாரணை நடைமுறை',
        description: 'தெளிவான பயண விவரங்கள், உறுதி செய்யப்பட்ட இருக்கை அளவுகள் மற்றும் இறுதி செய்வதற்கு முன் நேரடி தொலைபேசி/வாட்ஸ்அப் சரிபார்ப்பு.'
      }
    ];
  }

  if (lang === 'hi') {
    return [
      {
        title: 'विशिष्ट वाहन श्रेणियां',
        description: 'हमारी 8-सीटर टवेरा, 22-सीटर ब्लू टूरिस्टर, 25-सीटर ग्रीन महिंद्रा वाहन और ओमनी वैन में से अपने समूह की संख्या के अनुसार उपयुक्त वाहन चुनें।'
      },
      {
        title: 'सीधा समन्वयक सहयोग',
        description: 'प्रत्येक बुकिंग पूछताछ की समीक्षा चेन्नई स्थित एसवी ट्रैवल्स टीम द्वारा सीधे की जाती है ताकि समय और उपलब्धता सुनिश्चित हो सके।'
      },
      {
        title: 'समर्पित स्कूल एवं पर्यटन आवागमन',
        description: 'भवांस स्कूल के छात्रों के लिए विशेष व्यवस्था तथा शैक्षिक एवं सामान्य पर्यटन के लिए भरोसेमंद समाधान।'
      },
      {
        title: 'पारदर्शी पूछताछ प्रक्रिया',
        description: 'स्पष्ट यात्रा मानक, पुष्ट बैठने की क्षमता और बुकिंग से पूर्व सीधे फ़ोन अथवा व्हाट्सएप द्वारा सत्यापन।'
      }
    ];
  }

  return WHY_CHOOSE_US_POINTS;
};

export const COMPANY_CONTACT = {
  name: 'SV Travels',
  tagline: 'Your Journey, Our Responsibility',
  phone: '9884475500',
  formattedPhone: '+91 98844 75500',
  email: 'svtravelschennai51@gmail.com',
  notificationEmail: 'svltravelschennai51@gmail.com',
  address: '13/7, NSC Bose Nagar, Alex Nagar, MMC, Chennai - 51.',
  whatsappNumber: '919884475500',
  whatsappMessage: 'Hello SV Travels, I would like to enquire about your travel services.',
  whatsappUrl: 'https://wa.me/919884475500?text=Hello%20SV%20Travels,%20I%20would%20like%20to%20enquire%20about%20your%20travel%20services.',
  operatingHours: 'Monday – Saturday: 7:00 AM – 8:30 PM | Sunday: 8:00 AM – 6:00 PM',
  bookingDisclaimer: 'Submitting this form creates a booking enquiry. SV Travels will contact you to confirm vehicle availability, schedule details, and pricing.'
};
