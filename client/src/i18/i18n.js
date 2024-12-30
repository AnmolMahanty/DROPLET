import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
  en: {
    translation: {
      navigation: {
        home: 'Home',
      },
      title: {
        title1: 'Droplet',
      },
      home: {
        home1: "Welcome to Droplet",
        home2: "Empowering farmers, households, and industries with intelligent water solutions. Join Droplet today and lead the way toward a sustainable future in water management.",
        home3: "Sign In",
        home4: "Learn More",
        home5: "Your browser does not support the video tag.",
        //About Section
        home6: "About Droplet",
        home7: "Droplet is an innovative project aimed at revolutionizing water management across various sectors. Our mission is to provide smart, efficient, and sustainable water solutions for farmers, households, and industries.",
        home8: "By leveraging cutting-edge technology and data-driven insights, we help our users optimize their water usage, reduce waste, and contribute to a more sustainable future.",
        //Industry Section
        home9: "Visit our Industry Website",
        home10: "It's a one-stop solution for companies to get certified for various food and beverage certificates and track the entire certification process.",
        home11: "Visit Now",
        //FAQ Section
        home12: "Frequently Asked Questions",
        home13: "What is Droplet?",
        home14: "Droplet is a water footprint tracking app that uses image recognition to calculate the environmental impact of foods, dishes, and crops.",
        home15: "How does it work?",
        home16: "Users can take photos of items, and Droplet analyzes them to estimate water usage based on a vast dataset of water consumption metrics.",
        home17: "What features does it include?",
        home18: "Droplet offers localization support, real-time analysis, detailed reports, and a chatbot to assist users with their water footprint queries.",
        home19: "Can Droplet support multiple languages?",
        home20: "Yes, Droplet supports multiple languages, including English, Hindi, and Marathi, ensuring accessibility for a diverse audience.",
        home21: "Is my data secure?",
        home22: "Absolutely. Droplet ensures all user data is securely stored and processed in compliance with industry standards for data privacy and protection.",
        home23: "Can I track my progress over time?",
        home24: "Yes, Droplet provides visual reports and timelines to help you monitor and improve your water footprint over time.",
        home25: "Does Droplet provide suggestions for improvement?",
        home26: "Yes, the app suggests actionable ways to reduce your water usage based on your analysis results and habits.",
        home27: "What platforms is Droplet available on?",
        home28: "Droplet is available on both web and mobile platforms, ensuring you can track your water footprint anytime, anywhere.",
        //Footer Section
        home29: "© 2024 Droplet. All rights reserved",
        //Feature Section
        home30: "Farmer's Corner",
        home31: "Connect with local farmers, learn sustainable practices, and support your community's agriculture.",
        home32: "Food Calculator",
        home33: "Calculate the environmental impact of your meals and discover eco-friendly alternatives.",
        home34: "Daily Footprint",
        home35: "Track your daily carbon footprint and get personalized tips to reduce your environmental impact.",
      },      
      navbar: {
        navbar1: 'Sign In',
      },
      signIn: {
        signIn1: "Welcome back! Let's continue our journey towards water conservation and a sustainable future.",
        signIn2: "Sign in with Google",
        signIn3: "Don't have an account",
        signIn4: "Sign Up",
        signIn5: "Your browser does not support the video tag.",
      },
      signUp: {
        signUp1: "Join us in building a sustainable future. Track, conserve, and sustain water - every drop counts.",
        signUp2: "Sign up with Google",
        signUp3: "Already have an account",
        signUp4: "Sign In",
        signUp5: "Your browser does not support the video tag.",
      },    
      dashboard: {
        dashboard1: "Dish Footprint",
        dashboard2: "Daily Calculator",
        dashboard3: "Farmer Corner",
        dashboard4: "Blog",
      },
      FC: {
        FC1: "Question",
        FC2: "of",
        FC3: "Select an option",
        FC4: "Back",
        FC5: "Submit",
        FC6: "Next",
        FC7: "Enter the crop name?",
        //RESULT
        FC8: "Submission Successful!",
        FC9: "Thank you for your submission.",
        FC10: "Submit Another Response",
        FC11: "Farmer's Corner",
        FC12: "Connect with local farmers, learn sustainable practices, and support your community's agriculture.",
        FC13: "Join the Community",
        FC14: "Learn More",
        FC15: "Your browser does not support the video tag.",
        FC16: "Farmer's Corner",
        FC17: "Connect with local farmers, learn sustainable practices, and support your community's agriculture.",
        FC18: "Join the Community",
        FC19: "Learn More",
        FC20: "Your browser does not support the video tag.",
        FC21: "Farmer's Corner",
        FC22: "Connect with local farmers, learn sustainable practices, and support your community's agriculture.",
        FC23: "Join the Community",
        FC24: "Learn More",
        FC25: "Your browser does not support the video tag.",
        FC26: "Farmer's Corner",
        FC27: "Connect with local farmers, learn sustainable practices, and support your community's agriculture.",
        FC28: "Join the Community",
        FC29: "Learn More",
        FC30: "Your browser does not support the video tag.",
      },
    }
  },
  hi: {
    translation: {
      navigation: {
        home: 'होम',
      },
      title: {
        title1: 'ड्रॉपलेट',
      },
      home: {
        home1 : "ड्रॉपलेट में आपका स्वागत है",
        home2 : "किसानों, घरों और उद्योगों को बुद्धिमान जल समाधानों के साथ सशक्त बनाएं। आज ही ड्रॉपलेट से जुड़ें और जल प्रबंधन में एक स्थायी भविष्य की ओर कदम बढ़ाएं।",
        home3 : "साइन इन करें",
        home4 : "अधिक जानें",
        home5 : "आपका ब्राउज़र वीडियो टैग का समर्थन नहीं करता।",
        //About Section
        home6 : "ड्रॉपलेट के बारे में",
        home7 : "ड्रॉपलेट एक अभिनव परियोजना है जिसका उद्देश्य विभिन्न क्षेत्रों में जल प्रबंधन में क्रांति लाना है। हमारा मिशन किसानों, घरों और उद्योगों के लिए स्मार्ट, कुशल और स्थायी जल समाधान प्रदान करना है।",
        home8 : "आधुनिक तकनीक और डेटा-संचालित अंतर्दृष्टियों का उपयोग करके, हम अपने उपयोगकर्ताओं को उनके जल उपयोग को अनुकूलित करने, अपशिष्ट कम करने और एक अधिक स्थायी भविष्य में योगदान करने में मदद करते हैं।",
        //Industry Section
        home9 : "हमारी उद्योग वेबसाइट पर जाएं",
        home10 : "यह कंपनियों के लिए विभिन्न खाद्य और पेय प्रमाणपत्र प्राप्त करने और संपूर्ण प्रमाणन प्रक्रिया को ट्रैक करने के लिए एक वन-स्टॉप समाधान है।",
        home11 : "अभी जाएं",
        //FAQ Section
        home12 : "अक्सर पूछे जाने वाले प्रश्न",
        home13 : "ड्रॉपलेट क्या है?",
        home14 : "ड्रॉपलेट एक जल पदचिह्न ट्रैकिंग ऐप है जो खाद्य पदार्थों, व्यंजनों और फसलों के पर्यावरणीय प्रभाव की गणना के लिए छवि पहचान का उपयोग करता है।",
        home15 : "यह कैसे काम करता है?",
        home16 : "उपयोगकर्ता वस्तुओं की तस्वीरें ले सकते हैं, और ड्रॉपलेट उन्हें जल खपत मेट्रिक्स के एक बड़े डेटासेट के आधार पर विश्लेषण करता है।",
        home17 : "इसमें कौन-कौन से फीचर्स शामिल हैं?",
        home18 : "ड्रॉपलेट स्थानीयकरण समर्थन, रियल-टाइम विश्लेषण, विस्तृत रिपोर्ट, और उपयोगकर्ताओं की जल पदचिह्न क्वेरी में मदद करने के लिए एक चैटबॉट प्रदान करता है।",
        home19 : "क्या ड्रॉपलेट कई भाषाओं का समर्थन करता है?",
        home20 : "हां, ड्रॉपलेट कई भाषाओं का समर्थन करता है, जिसमें अंग्रेजी, हिंदी और मराठी शामिल हैं, जिससे यह विभिन्न उपयोगकर्ताओं के लिए सुलभ हो जाता है।",
        home21 : "क्या मेरा डेटा सुरक्षित है?",
        home22 : "बिल्कुल। ड्रॉपलेट यह सुनिश्चित करता है कि सभी उपयोगकर्ता डेटा को उद्योग मानकों के अनुसार सुरक्षित रूप से संग्रहीत और संसाधित किया जाए।",
        home23 : "क्या मैं समय के साथ अपनी प्रगति को ट्रैक कर सकता हूँ?",
        home24 : "हां, ड्रॉपलेट दृश्य रिपोर्ट और समयरेखा प्रदान करता है ताकि आप अपने जल पदचिह्न को समय के साथ मॉनिटर और सुधार सकें।",
        home25 : "क्या ड्रॉपलेट सुधार के सुझाव देता है?",
        home26 : "हां, ऐप आपके विश्लेषण परिणामों और आदतों के आधार पर जल उपयोग को कम करने के लिए कार्रवाई योग्य सुझाव देता है।",
        home27 : "ड्रॉपलेट किन प्लेटफार्मों पर उपलब्ध है?",
        home28 : "ड्रॉपलेट वेब और मोबाइल दोनों प्लेटफार्मों पर उपलब्ध है, यह सुनिश्चित करते हुए कि आप कभी भी, कहीं भी अपने जल पदचिह्न को ट्रैक कर सकते हैं।",
        //Footer Section
        home29 : "© 2024 ड्रॉपलेट। सर्वाधिकार सुरक्षित।",
        //Feature Section
        home30 : "किसान का कोना",
        home31 : "स्थानीय किसानों से जुड़ें, स्थायी प्रथाओं के बारे में जानें, और अपने समुदाय की कृषि का समर्थन करें।",
        home32 : "खाद्य कैलकुलेटर",
        home33 : "अपने भोजन के पर्यावरणीय प्रभाव की गणना करें और पर्यावरण-अनुकूल विकल्प खोजें।",
        home34 : "दैनिक पदचिह्न",
        home35 : "अपने दैनिक कार्बन पदचिह्न को ट्रैक करें और अपने पर्यावरणीय प्रभाव को कम करने के लिए व्यक्तिगत सुझाव प्राप्त करें।",
      },
      navbar: {
        navbar1: 'साइन इन',
      },
      signIn: {
        signIn1: "वापस स्वागत है! चलिए जल संरक्षण और एक स्थायी भविष्य की ओर अपनी यात्रा जारी रखें।",
        signIn2: "गूगल से साइन इन करें",
        signIn3: "क्या आपका खाता नहीं है",
        signIn4: "साइन अप करें",
        signIn5: "आपका ब्राउज़र वीडियो टैग को सपोर्ट नहीं करता।",
      },
      signUp: {
        signUp1: "हमारे साथ जुड़ें और एक स्थायी भविष्य बनाएं। पानी का पता लगाएं, बचाएं और टिकाएं - हर बूंद मायने रखती है।",
        signUp2: "गूगल से साइन अप करें",
        signUp3: "पहले से ही खाता है",
        signUp4: "साइन इन करें",
        signUp5: "आपका ब्राउज़र वीडियो टैग को सपोर्ट नहीं करता।",
      },   
      dashboard: {
        dashboard1: "व्यंजन पदचिह्न",
        dashboard2: "दैनिक कैलकुलेटर",
        dashboard3: "किसान कट्टा",
        dashboard4: "ब्लॉग",
      },
    }
  },
  mr: {
    translation: {
      navigation: {
        home: 'होम',
      },
      title: {
        title1: 'ड्रॉपलेट',
      },
      home: {
        home1 : "ड्रॉपलेटमध्ये आपले स्वागत आहे",
        home2 : "शेतकरी, घरगुती वापरकर्ते आणि उद्योगांना बुद्धिमान जलसंधारण उपायांसह सक्षम करा. आजच ड्रॉपलेटमध्ये सामील व्हा आणि जल व्यवस्थापनात शाश्वत भविष्यासाठी पुढाकार घ्या.",
        home3 : "साइन इन करा",
        home4 : "अधिक जाणून घ्या",
        home5 : "आपला ब्राउझर व्हिडिओ टॅगला समर्थन देत नाही.",
        //About Section
        home6 : "ड्रॉपलेट बद्दल",
        home7 : "ड्रॉपलेट ही एक नाविन्यपूर्ण प्रकल्प आहे ज्याचा उद्देश विविध क्षेत्रांमध्ये जल व्यवस्थापनात क्रांती घडवून आणणे आहे. आमचे मिशन शेतकरी, घरगुती वापरकर्ते आणि उद्योगांसाठी स्मार्ट, कार्यक्षम आणि शाश्वत जल उपाय प्रदान करणे आहे.",
        home8 : "आम्ही अत्याधुनिक तंत्रज्ञान आणि डेटा-आधारित अंतर्दृष्टीचा उपयोग करून आमच्या वापरकर्त्यांना त्यांचा पाणी वापर ऑप्टिमाइझ करण्यासाठी, कचरा कमी करण्यासाठी आणि अधिक शाश्वत भविष्यात योगदान देण्यासाठी मदत करतो.",
        //Industry Section
        home9 : "आमच्या उद्योग वेबसाइटला भेट द्या",
        home10 : "हे कंपन्यांसाठी विविध अन्न व पेय प्रमाणपत्रे मिळवण्यासाठी आणि संपूर्ण प्रमाणपत्र प्रक्रिया ट्रॅक करण्यासाठी एकाच ठिकाणी समाधान आहे.",
        home11 : "आता भेट द्या",
        //FAQ Section
        home12 : "वारंवार विचारले जाणारे प्रश्न",
        home13 : "ड्रॉपलेट काय आहे?",
        home14 : "ड्रॉपलेट हे एक जल पदचिन्ह ट्रॅकिंग अॅप आहे जे अन्नपदार्थ, पदार्थ आणि पिकांच्या पर्यावरणीय परिणामांची गणना करण्यासाठी प्रतिमा ओळख तंत्रज्ञानाचा वापर करते.",
        home15 : "हे कसे कार्य करते?",
        home16 : "वापरकर्ते वस्तूंचे फोटो घेऊ शकतात, आणि ड्रॉपलेट त्यांचे विश्लेषण मोठ्या जल खपत डेटासेटच्या आधारावर करते.",
        home17 : "यामध्ये कोणते वैशिष्ट्ये समाविष्ट आहेत?",
        home18 : "ड्रॉपलेट स्थानिकीकरण समर्थन, रिअल-टाइम विश्लेषण, सविस्तर अहवाल, आणि वापरकर्त्यांच्या जल पदचिन्ह क्वेरीजसाठी एक चॅटबॉट प्रदान करते.",
        home19 : "ड्रॉपलेट अनेक भाषांना समर्थन देते का?",
        home20 : "होय, ड्रॉपलेट अनेक भाषांना समर्थन देते, ज्यामध्ये इंग्रजी, हिंदी आणि मराठी यांचा समावेश आहे, ज्यामुळे विविध वापरकर्त्यांसाठी ते सुलभ होते.",
        home21 : "माझा डेटा सुरक्षित आहे का?",
        home22 : "नक्कीच. ड्रॉपलेट सर्व वापरकर्ता डेटाचे सुरक्षित स्टोरेज आणि प्रक्रिया सुनिश्चित करते, जे डेटा गोपनीयता आणि संरक्षणासाठी उद्योग मानकांचे पालन करते.",
        home23 : "मी वेळोवेळी माझी प्रगती ट्रॅक करू शकतो का?",
        home24 : "होय, ड्रॉपलेट दृश्यात्मक अहवाल आणि वेळरेषा प्रदान करते, ज्यामुळे तुम्ही तुमच्या जल पदचिन्हावर नजर ठेवू शकता आणि ते सुधारू शकता.",
        home25 : "ड्रॉपलेट सुधारणा सुचवते का?",
        home26 : "होय, अॅप तुमच्या विश्लेषण निकालांवर आणि सवयींवर आधारित पाणी वापर कमी करण्यासाठी कृतीशील सूचना देते.",
        home27 : "ड्रॉपलेट कोणत्या प्लॅटफॉर्मवर उपलब्ध आहे?",
        home28 : "ड्रॉपलेट वेब आणि मोबाइल या दोन्ही प्लॅटफॉर्मवर उपलब्ध आहे, ज्यामुळे तुम्ही कधीही, कुठेही तुमच्या जल पदचिन्हाचे ट्रॅकिंग करू शकता.",
        //Footer Section
        home29 : "© 2024 ड्रॉपलेट. सर्व हक्क राखीव.",
        //Feature Section
        home30 : "शेतकऱ्यांचा कोपरा",
        home31 : "स्थानिक शेतकऱ्यांशी कनेक्ट करा, शाश्वत पद्धती जाणून घ्या आणि आपल्या समुदायाच्या शेतीला समर्थन द्या.",
        home32 : "अन्न गणक",
        home33 : "तुमच्या भोजनाचा पर्यावरणीय परिणाम मोजा आणि पर्यावरण-अनुकूल पर्याय शोधा.",
        home34 : "दैनंदिन पदचिन्ह",
        home35 : "तुमचे दैनंदिन कार्बन पदचिन्ह ट्रॅक करा आणि तुमच्या पर्यावरणीय परिणाम कमी करण्यासाठी वैयक्तिक सूचना मिळवा."
      },
      navbar: {
        navbar1: 'साइन इन',
      },
      signIn: {
        signIn1: "पुन्हा स्वागत आहे! चला जलसंवर्धन आणि टिकाऊ भविष्याच्या दिशेने आपला प्रवास सुरू ठेवूया.",
        signIn2: "गुगलने साइन इन करा",
        signIn3: "तुमचे खाते नाही का",
        signIn4: "साइन अप करा",
        signIn5: "तुमचा ब्राउझर व्हिडिओ टॅगला समर्थन देत नाही.",
      },
      signUp: {
        signUp1: "आमच्यासोबत सामील व्हा आणि टिकाऊ भविष्य घडवा। पाणी शोधा, जपा आणि टिकवा - प्रत्येक थेंब महत्त्वाचा आहे.",
        signUp2: "गुगलने साइन अप करा",
        signUp3: "आधीच खाते आहे",
        signUp4: "साइन इन करा",
        signUp5: "तुमचा ब्राउझर व्हिडिओ टॅगला समर्थन देत नाही.",
      },   
      dashboard: {
        dashboard1: "पदार्थ पदचिन्ह",
        dashboard2: "दैनिक कॅल्क्युलेटर",
        dashboard3: "शेतकरी कट्टा",
        dashboard4: "ब्लॉग",
      },              
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;