import React, { useState, useEffect } from 'react';

// Custom SVG Icons for high quality rendering
const SparklesIcon = () => (
  <svg className="w-5 h-5 text-[#0000ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-[#0000ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5 text-[#e31f26]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [isDataCleaned, setIsDataCleaned] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('marketing');
  const [selectedTimelineSlot, setSelectedTimelineSlot] = useState(0);
  const [submittingStatus, setSubmittingStatus] = useState('idle'); // idle, loading, success, error
  const [quizScore, setQuizScore] = useState(0);

  // Quiz State
  const [quizSelections, setQuizSelections] = useState({
    q1: false, q2: false, q3: false, q4: false, q5: false, q6: false, q7: false
  });

  // Roadmap State
  const [completedTasks, setCompletedTasks] = useState({
    t1: false, t2: false, t3: false, t4: false,
    t5: false, t6: false, t7: false, t8: false,
    t9: false, t10: false, t11: false
  });

  const [regForm, setRegForm] = useState({
    fullName: '', email: '', phone: '', experience: 'non-it-worker', message: ''
  });

  useEffect(() => {
    const trueCount = Object.values(quizSelections).filter(Boolean).length;
    setQuizScore(trueCount);
  }, [quizSelections]);

  const handleQuizToggle = (key) => {
    setQuizSelections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTaskToggle = (key) => {
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Tích hợp API Đăng ký khách hàng với Exponential Backoff Retry (Tối đa 5 lần)
  const handleRegSubmit = async (e) => {
    e.preventDefault();
    setSubmittingStatus('loading');

    const payload = {
      fullName: regForm.fullName,
      email: regForm.email,
      phone: regForm.phone,
      experience: regForm.experience,
      message: regForm.message,
      submittedAt: new Date().toISOString(),
      source: "mindx_da_career_guide_interactive_2026"
    };

    const sendLeadWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch('https://api.mindx.edu.vn/customer-registration/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP Error Status: ${response.status}`);
        }

        return await response.json();
      } catch (err) {
        if (retries > 0) {
          // Thử lại theo lũy thừa thời gian (delay nhân đôi)
          await new Promise(resolve => setTimeout(resolve, delay));
          return sendLeadWithRetry(retries - 1, delay * 2);
        } else {
          throw err;
        }
      }
    };

    try {
      await sendLeadWithRetry();
      setSubmittingStatus('success');
      // Reset form sau khi gửi thành công
      setRegForm({
        fullName: '', email: '', phone: '', experience: 'non-it-worker', message: ''
      });
    } catch (error) {
      setSubmittingStatus('error');
    }
  };

  const activeRoadmapTasksCount = Object.values(completedTasks).filter(Boolean).length;
  const roadmapProgressPercent = Math.round((activeRoadmapTasksCount / 11) * 100);

  // Background pattern dynamic styling
  const bgGridStyle = {
    backgroundImage: 'radial-gradient(#0000ff0d 1.5px, transparent 1.5px), radial-gradient(#e31f260a 1.5px, transparent 1.5px)',
    backgroundSize: '32px 32px',
    backgroundPosition: '0 0, 16px 16px'
  };

  const dirtyData = [
    { name: "Nguyễn Văn A", phone: "0901-234-567", date: "05/19/2026", revenue: "1500000", status: "Bẩn (Sai SĐT, Độc lập)" },
    { name: "nguyen van a", phone: "0901234567", date: "19-05-2026", revenue: "NULL", status: "Bẩn (Trùng, Trống số liệu)" },
    { name: "Chị Lan (Sales)", phone: "0987.654.321", date: "19/05/2026", revenue: "2,500,000", status: "Bẩn (Dính tên rác, sai định dạng)" }
  ];

  const cleanData = [
    { name: "Nguyễn Văn A", phone: "0901234567", date: "19/05/2026", revenue: "1,500,000 đ", status: "Sạch (Đã gộp & đồng bộ)" },
    { name: "Nguyễn Thị Lan", phone: "0987654321", date: "19/05/2026", revenue: "2,500,000 đ", status: "Sạch (Đã chuẩn hóa thông tin)" }
  ];

  const timelineData = [
    {
      time: "08:30 - 09:00",
      title: "KIỂM TRA & PHÁT HIỆN SỰ CỐ",
      desc: "Mở dashboard vận hành hàng ngày. Phát hiện tỷ lệ hủy đơn (Cancellation Rate) của nhóm khách hàng mới tăng vọt 15% vào tối hôm qua.",
      accent: "border-l-4 border-[#e31f26] bg-[#e31f26]/5 text-[#e31f26]"
    },
    {
      time: "09:00 - 10:30",
      title: "TRUY VẤN DỮ LIỆU THÔ (DÙNG AI TRỢ GIÚP)",
      desc: "Dùng ChatGPT/Claude để lên cấu trúc câu lệnh SQL nhanh, sau đó tự tinh chỉnh để kết nối (join) bảng Orders và Logs để tìm nguyên nhân gốc rễ.",
      accent: "border-l-4 border-[#0000ff] bg-[#0000ff]/5 text-[#0000ff]"
    },
    {
      time: "10:30 - 11:30",
      title: "PHÁT HIỆN INSIGHT & PHỐI HỢP PHÒNG BAN",
      desc: "Phát hiện cổng thanh toán Momo bị lỗi kết nối từ 20:00 - 22:00 khiến khách hàng không thanh toán được. DA báo ngay cho bộ phận Tech để kịp sửa chữa.",
      accent: "border-l-4 border-amber-500 bg-amber-50 text-amber-700"
    },
    {
      time: "11:30 - 12:00",
      title: "BÁO CÁO NHANH CHO BAN GIÁM ĐỐC",
      desc: "Gửi báo cáo ngắn cho Giám đốc vận hành kèm đề xuất kích hoạt lại giỏ hàng bị bỏ rơi của khách hàng bằng voucher đền bù.",
      accent: "border-l-4 border-[#0000ff] bg-[#0000ff]/5 text-[#0000ff]"
    },
    {
      time: "13:30 - 15:30",
      title: "XỬ LÝ DỮ LIỆU BẨN (DATA CLEANING)",
      desc: "Nhận file dữ liệu thô từ chiến dịch Marketing tuần trước gửi từ các KOLs. Loại bỏ dữ liệu trùng, xử lý các dòng trống (Null) trên Excel/Power BI.",
      accent: "border-l-4 border-slate-400 bg-slate-100 text-slate-700"
    },
    {
      time: "15:30 - 16:30",
      title: "TRỰC QUAN HÓA (DASHBOARD)",
      desc: "Xây dựng Dashboard báo cáo hiệu quả chiến dịch tiếp thị trên Power BI, so sánh chỉ số ROI thực tế với mục tiêu ban đầu.",
      accent: "border-l-4 border-[#0000ff] bg-[#0000ff]/5 text-[#0000ff]"
    },
    {
      time: "16:30 - 17:30",
      title: "KỂ CHUYỆN DỮ LIỆU (STORYTELLING)",
      desc: "Tóm tắt báo cáo thành 3 trang slide súc tích, giải thích số liệu bằng ngôn ngữ kinh doanh để ngày mai thuyết trình trước Sếp và team Marketing.",
      accent: "border-l-4 border-[#e31f26] bg-[#e31f26]/5 text-[#e31f26]"
    }
  ];

  const domains = {
    marketing: {
      title: "E-commerce & Bán lẻ",
      questions: [
        "Sếp hỏi: Tại sao 40% khách hàng bỏ giỏ hàng ở bước thanh toán?",
        "Sản phẩm áo thun thường được mua kèm với sản phẩm nào nhất để làm combo tăng doanh thu?"
      ],
      kpis: ["AOV (Giá trị đơn trung bình)", "Churn Rate (Tỷ lệ hủy)", "Retention Rate (Tỷ lệ giữ chân)"],
      background: "Sales Admin, Quản lý cửa hàng, Chăm sóc khách hàng, Nhân viên kinh doanh cũ.",
      weapon: "Nhạy cảm với hành vi mua sắm, thấu hiểu quy trình vận hành trực tiếp cửa hàng."
    },
    advertising: {
      title: "Marketing & Quảng cáo",
      questions: [
        "Kênh quảng cáo TikTok hay Facebook mang lại khách hàng trung thành nhiều hơn?",
        "Chi phí thực tế để sở hữu một khách hàng mới (CAC) trong tháng này tăng hay giảm?"
      ],
      kpis: ["ROI (Hiệu suất quảng cáo)", "CAC (Chi phí có khách hàng mới)", "CTR (Tỷ lệ nhấp chuột)"],
      background: "Marketing Executive, Copywriter, Content Creator, Media Planner.",
      weapon: "Am hiểu sâu sắc về phễu chuyển đổi khách hàng và tư duy tối ưu hóa ngân sách tiếp thị."
    },
    finance: {
      title: "Kế toán & Tài chính",
      questions: [
        "Làm sao để tự động hóa việc đối chiếu 10,000 hóa đơn ngân hàng với sổ sách kế toán?",
        "Doanh nghiệp có nguy cơ bị thâm hụt dòng tiền vào chu kỳ tháng tới hay không?"
      ],
      kpis: ["Cash Flow (Dòng tiền)", "NPV / IRR (Hiệu quả dự án)", "Error Rate (Tỷ lệ sai lệch số liệu)"],
      background: "Kế toán viên, Kiểm toán viên, Giao dịch viên ngân hàng, Chuyên viên tín dụng.",
      weapon: "Sự cẩn trọng tuyệt đối, độ chính xác đến từng con số và khả năng xử lý cấu trúc tài chính vững vàng."
    },
    logistics: {
      title: "Vận tải & Logistics",
      questions: [
        "Tuyến đường giao hàng nào của shipper đang bị trễ hẹn và tốn nhiên liệu nhiều nhất?",
        "Làm thế nào để giảm tối đa lượng hàng tồn kho của những nhóm sản phẩm bán chậm?"
      ],
      kpis: ["DOH (Ngày tồn kho trung bình)", "OTIF (Tỷ lệ giao đúng giờ)", "Shipping Cost per Unit"],
      background: "Nhân viên kho vận, Điều phối viên giao hàng, Chuyên viên mua hàng (Procurement).",
      weapon: "Tư duy tối ưu hóa quy trình phân phối vật lý, định vị địa lý và hạn chế lãng phí tài nguyên."
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#2c2a2b] font-sans antialiased relative overflow-hidden selection:bg-[#0000ff]/10 selection:text-[#0000ff]" style={bgGridStyle}>
      
      {/* Decorative Blur Ambient Glow Blobs */}
      <div className="absolute top-10 left-[-100px] w-[500px] h-[500px] bg-[#0000ff]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[-150px] w-[600px] h-[600px] bg-[#e31f26]/4 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-[20%] w-[450px] h-[450px] bg-[#0000ff]/6 rounded-full blur-[130px] pointer-events-none z-0"></div>

      {/* Top Interactive Banner */}
      <div className="bg-[#0000ff] text-white text-xs font-bold px-4 py-3 text-center flex justify-center items-center gap-2 relative z-10 shadow-md">
        <svg className="w-4 h-4 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="tracking-wide">KỶ NGUYÊN AI-AUGMENTED DATA ANALYST 2026: KHAI PHÁ THẾ MẠNH SỰ NGHIỆP THỰC CHIẾN</span>
      </div>

      {/* Main Layout Wrapper */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 relative z-10">
        
        {/* Header Block with Premium Dual Color Shadow Underline */}
        <header className="mb-12 text-center md:text-left md:flex justify-between items-end border-b-4 border-slate-200/80 pb-8 relative">
          <div>
            <span className="text-[#0000ff] font-extrabold tracking-widest uppercase text-xs block mb-1">MINDX TECHNOLOGY ACADEMY</span>
            <h1 className="text-4xl md:text-6xl font-black text-[#e31f26] tracking-tight leading-none drop-shadow-sm">
              DATA ANALYST LÀM GÌ THỰC SỰ?
            </h1>
            <p className="text-[#2c2a2b]/80 mt-3 max-w-2xl text-sm md:text-base font-medium leading-relaxed font-semibold">
              Bản mô tả công việc không có trong JD – Hướng dẫn tỉnh táo dành cho người muốn bước vào ngành dữ liệu năm 2025 - 2026.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex justify-center">
            <button 
              onClick={() => setActiveTab('cta')} 
              className="px-6 py-3.5 bg-[#0000ff] hover:bg-blue-850 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,255,0.25)] hover:shadow-none hover:translate-y-0.5 flex items-center gap-2"
            >
              <span>NHẬN LỘ TRÌNH 1-1 MIỄN PHÍ</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          <div className="absolute bottom-[-4px] left-0 w-32 h-1 bg-[#0000ff]"></div>
        </header>

        {/* High Contrast Navigation - Glowing Tabs */}
        <nav className="flex overflow-x-auto pb-2 mb-10 gap-2 scrollbar-none border-b border-slate-200 text-xs md:text-sm">
          {[
            { id: 'welcome', label: '1. Góc nhìn AI 2026', icon: SparklesIcon },
            { id: 'day-in-life', label: '2. Một ngày thực tế', icon: TrashIcon },
            { id: 'domain-skills', label: '3. Bản đồ năng lực', icon: CheckCircleIcon },
            { id: 'suitability-quiz', label: '4. Trắc nghiệm phù hợp', icon: SparklesIcon },
            { id: 'roadmap', label: '5. Lộ trình 90 ngày', icon: CheckCircleIcon },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl whitespace-nowrap transition-all duration-300 font-extrabold text-[12px] md:text-xs uppercase tracking-wider ${
                  isActive 
                    ? 'bg-white text-[#0000ff] border-t-4 border-b-2 border-l border-r border-slate-200 border-t-[#0000ff] shadow-[0_-4px_12px_rgba(0,0,255,0.05)]' 
                    : 'text-slate-500 hover:text-[#0000ff] hover:bg-slate-100/50'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ==================== TAB 1: GÓC NHÌN AI 2026 ==================== */}
        {activeTab === 'welcome' && (
          <div className="space-y-10 animate-fadeIn relative">
            
            {/* Hook Alerts */}
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="bg-white border-t-4 border-[#e31f26] p-6 rounded-b-2xl shadow-[0_8px_25px_rgba(227,31,38,0.06)] border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#e31f26]/5 rounded-bl-full pointer-events-none"></div>
                <span className="text-xs font-black text-[#e31f26] tracking-widest uppercase block mb-1">🚨 NGHỊCH LÝ TUYỂN DỤNG</span>
                <h3 className="text-base font-bold text-[#2c2a2b] mb-2">Hơn 85% Fresher bị loại</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Lý do cốt lõi là chỉ học vẹt các cú pháp công cụ máy móc nhưng hoàn toàn bế tắc trước các bài toán thực tế của doanh nghiệp.
                </p>
              </div>

              <div className="bg-white border-t-4 border-[#0000ff] p-6 rounded-b-2xl shadow-[0_8px_25px_rgba(0,0,255,0.06)] border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#0000ff]/5 rounded-bl-full pointer-events-none"></div>
                <span className="text-xs font-black text-[#0000ff] tracking-widest uppercase block mb-1">💡 ĐÒN BẨY CÔNG NGHỆ</span>
                <h3 className="text-base font-bold text-[#2c2a2b] mb-2">Trí tuệ nhân tạo (AI) viết code</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Khi AI gõ lệnh nhanh gấp 10 lần con người, rào cản kỹ thuật đã biến mất. Sự khác biệt nằm ở <span className="text-[#0000ff] font-extrabold">tư duy đặt câu hỏi</span> của bạn.
                </p>
              </div>

              <div className="bg-white border-t-4 border-amber-500 p-6 rounded-b-2xl shadow-[0_8px_25px_rgba(245,158,11,0.06)] border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50/5 rounded-bl-full pointer-events-none"></div>
                <span className="text-xs font-black text-amber-600 tracking-widest uppercase block mb-1">🌟 THẾ HỆ DA MỚI 2026</span>
                <h3 className="text-base font-bold text-[#2c2a2b] mb-2">AI-Augmented Analyst</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Thế hệ biết biến AI thành trợ lý đắc lực, giải phóng 70% thời gian cơ học để tập trung sâu rộng vào phân tích giải pháp chiến lược.
                </p>
              </div>

            </div>

            {/* INFOGRAPHIC 1: THE AI-AUGMENTED BALANCE SCALE */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,255,0.03)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="text-center md:text-left mb-8 border-b border-slate-100 pb-4">
                <span className="text-xs font-black text-[#0000ff] uppercase tracking-widest block">INFOGRAPHIC 01</span>
                <h2 className="text-xl md:text-2xl font-black text-[#e31f26] mt-1">CƠ CẤU PHÁT TRIỂN NGHỀ NGHIỆP TRONG KỶ NGUYÊN AI</h2>
              </div>

              {/* Dynamic Diagram representing the balance */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* Visual side of diagram */}
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl relative">
                  <h4 className="text-xs font-extrabold text-[#2c2a2b] uppercase tracking-wider mb-4 text-center">QUY TRÌNH RA QUYẾT ĐỊNH DỰA TRÊN DỮ LIỆU</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#e31f26] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                        01
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200 w-full">
                        <span className="font-bold text-xs text-[#2c2a2b]">Doanh nghiệp đặt câu hỏi cốt lõi</span>
                        <p className="text-[10px] text-slate-500 font-semibold">Tại sao doanh thu sụt giảm? Cần phương án tối ưu nào?</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center py-1">
                      <svg className="w-5 h-5 text-slate-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 13l-7 7-7-7m14-6l-7 7-7-7" /></svg>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0000ff] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                        02
                      </div>
                      <div className="bg-[#0000ff]/5 p-2.5 rounded-xl border border-[#0000ff]/30 w-full">
                        <span className="font-bold text-xs text-[#0000ff]">AI hỗ trợ viết Code truy vấn thô</span>
                        <p className="text-[10px] text-slate-500 font-semibold">Tự động dịch ngôn ngữ tự nhiên thành SQL/Python trong 3s.</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center py-1">
                      <svg className="w-5 h-5 text-slate-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 13l-7 7-7-7m14-6l-7 7-7-7" /></svg>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                        03
                      </div>
                      <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 w-full">
                        <span className="font-bold text-xs text-emerald-850">Đọc hiểu & Đưa ra đề xuất thực thi</span>
                        <p className="text-[10px] text-slate-500 font-semibold">Giúp doanh nghiệp tăng doanh số dựa trên 3 hành động cụ thể.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytical comparisons with rich background textures */}
                <div className="space-y-4">
                  <div className="border border-red-200 bg-gradient-to-br from-red-50 to-white p-5 rounded-xl relative overflow-hidden">
                    <span className="absolute bottom-[-10px] right-[-10px] text-6xl opacity-5">❌</span>
                    <h4 className="text-xs font-black text-[#e31f26] uppercase">❌ Cỗ Máy Gõ Code Dạo (Tool-Centric)</h4>
                    <p className="text-[11px] text-[#2c2a2b] mt-2 leading-relaxed font-semibold">
                      Làm việc rập khuôn cơ học. Sợ hãi sự phát triển của AI. Xuất dữ liệu Excel thô sơ không có phân tích chuyên sâu. Dễ dàng bị thay thế do không đem lại giá trị doanh thu trực tiếp.
                    </p>
                  </div>
                  
                  <div className="border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl relative overflow-hidden">
                    <span className="absolute bottom-[-10px] right-[-10px] text-6xl opacity-5 text-[#0000ff]">✓</span>
                    <h4 className="text-xs font-black text-[#0000ff] uppercase">✓ AI-Augmented Analyst (Thế hệ mới)</h4>
                    <p className="text-[11px] text-[#2c2a2b] mt-2 leading-relaxed font-semibold">
                      Cộng hưởng AI khuếch đại hiệu suất làm việc. Tập trung khai thác chuyên sâu tư duy nghiệp vụ (Business Acumen). Đề xuất giải pháp hành động súc tích được Ban giám đốc săn đón hàng đầu.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Income & Salary Visual Dashboard Charts */}
            <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl shadow-[inset_0_4px_12px_rgba(0,0,0,0.01)]">
              <h3 className="text-lg md:text-xl font-black text-[#e31f26] mb-2 flex items-center gap-2">
                <span className="p-1 bg-[#0000ff] text-white rounded text-xs">📊</span>
                Bức Tranh Thu Nhập Data Analyst Tại Thị Trường Việt Nam
              </h3>
              <p className="text-xs text-slate-500 mb-8 font-semibold">Nguồn khảo sát thực chứng từ nền tảng nhân sự ITviec và TopDev.</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Fresher Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-[#0000ff]/30 transition-all duration-300 relative group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-300 rounded-t-2xl group-hover:bg-[#0000ff] transition-all"></div>
                  <span className="text-[10px] font-black text-[#0000ff] tracking-widest block uppercase mb-1">FRESHER (DƯỚI 1 NĂM)</span>
                  <div className="text-3xl font-black text-[#2c2a2b] flex items-baseline gap-1">
                    12 - 15 <span className="text-xs font-bold text-slate-500">Tr/Tháng</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 leading-relaxed font-semibold">
                    Tập trung chuẩn hóa, làm sạch hệ thống dữ liệu thô và xây dựng hệ thống báo cáo cơ bản đầu vào.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400">Tỷ trọng công việc</span>
                    <span className="text-xs font-bold text-slate-700">Mức 1</span>
                  </div>
                </div>

                {/* Junior Card */}
                <div className="bg-white border border-[#0000ff]/30 p-6 rounded-2xl shadow-[0_8px_25px_rgba(0,0,255,0.04)] relative group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#0000ff] rounded-t-2xl"></div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#0000ff]/10 text-[#0000ff] text-[8px] font-black uppercase rounded-full">Phổ biến</div>
                  <span className="text-[10px] font-black text-[#0000ff] tracking-widest block uppercase mb-1">JUNIOR (1 - 3 NĂM)</span>
                  <div className="text-3xl font-black text-[#0000ff] flex items-baseline gap-1">
                    16 - 25 <span className="text-xs font-bold text-[#0000ff]">Tr/Tháng</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 leading-relaxed font-semibold">
                    Chịu trách nhiệm phân tích sâu sắc các hành vi, mô hình dữ liệu của một nhánh nghiệp vụ (Marketing/Sales/CSKH).
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#0000ff]">Tỷ trọng công việc</span>
                    <span className="text-xs font-bold text-[#0000ff]">Mức 2</span>
                  </div>
                </div>

                {/* Senior Card */}
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-[#e31f26]/30 transition-all duration-300 relative group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-300 rounded-t-2xl group-hover:bg-[#e31f26] transition-all"></div>
                  <span className="text-[10px] font-black text-[#e31f26] tracking-widest block uppercase mb-1">SENIOR (TRÊN 3 NĂM)</span>
                  <div className="text-3xl font-black text-[#e31f26] flex items-baseline gap-1">
                    30 - 50+ <span className="text-xs font-bold text-slate-500">Tr/Tháng</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 leading-relaxed font-semibold">
                    Vai trò tư vấn giải pháp chiến lược trực tiếp cho Ban Giám Đốc giúp tối ưu doanh thu toàn diện.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-slate-400">Tỷ trọng công việc</span>
                    <span className="text-xs font-bold text-slate-700">Mức 3</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Target Audience Matchers */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#e31f26] mb-4 text-center md:text-left">ĐỐI TƯỢNG PHÙ HỢP CẨM NANG NÀY?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50/30 p-5 rounded-2xl border border-[#0000ff]/10">
                  <h3 className="text-[#0000ff] font-extrabold text-sm mb-3">✓ Bạn Nên Đọc Nếu:</h3>
                  <ul className="space-y-3 text-xs text-[#2c2a2b]/95 font-semibold">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0000ff] font-bold">✓</span>
                      <span>Người đi làm trái ngành (Kế toán, Marketing, Logistics...) muốn chuyển dịch sự nghiệp tăng thu nhập.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0000ff] font-bold">✓</span>
                      <span>Sinh viên các khối ngành Kinh tế sắp ra trường lo lắng trước biến động thị trường.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0000ff] font-bold">✓</span>
                      <span>Người đang tự học bị ngợp kiến thức gõ code, chưa biết bắt đầu từ đâu.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50/30 p-5 rounded-2xl border border-[#e31f26]/10">
                  <h3 className="text-[#e31f26] font-extrabold text-sm mb-3">✕ KHÔNG Phù Hợp Nếu:</h3>
                  <ul className="space-y-3 text-xs text-[#2c2a2b]/95 font-semibold">
                    <li className="flex items-start gap-2">
                      <span className="text-[#e31f26] font-bold">✕</span>
                      <span>Các Senior DA tìm kiếm các cấu trúc chuyên sâu về Machine Learning, Deep Learning hay Cloud.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#e31f26] font-bold">✕</span>
                      <span>Những người chỉ tìm kiếm khóa học lập trình thô cơ học không quan tâm kinh doanh.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Primary Action */}
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setActiveTab('day-in-life')}
                className="px-8 py-4 bg-[#0000ff] hover:bg-blue-800 text-white font-black rounded-xl text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,255,0.2)] flex items-center gap-2"
              >
                <span>XEM MỘT NGÀY THỰC TẾ CỦA DATA ANALYST</span>
                <svg className="w-4 h-4 animate-ping" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

          </div>
        )}

        {/* ==================== TAB 2: MỘT NGÀY THỰC TẾ & INFOGRAPHIC DATA CLEANING ==================== */}
        {activeTab === 'day-in-life' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Header context */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
              <div className="max-w-2xl">
                <span className="text-xs font-black text-[#e31f26] tracking-widest block uppercase mb-1">CƠ CẤU THỜI GIAN THỰC TẾ</span>
                <h2 className="text-xl md:text-3xl font-black text-[#e31f26] leading-tight">
                  DA dành 60% - 80% thời gian chỉ để làm sạch dữ liệu bẩn!
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-semibold">
                  Ở các doanh nghiệp Việt Nam, dữ liệu cực kỳ hỗn loạn và bị trùng lặp do thao tác thủ công. Sơ đồ mạch lọc dưới đây minh họa trực quan cách một DA biến đổi các hàng số liệu bẩn thành dữ liệu sạch chuẩn hóa.
                </p>
              </div>
              <div className="bg-[#e31f26] text-white p-5 rounded-2xl text-center shrink-0 min-w-[150px] shadow-lg shadow-red-500/10">
                <div className="text-3xl font-black">60%-80%</div>
                <span className="text-[9px] font-black tracking-widest uppercase block mt-1">Dành Cho Data Cleaning</span>
              </div>
            </div>

            {/* INFOGRAPHIC 2: THE DATA CLEANING FUNNEL PIPELINE */}
            <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              
              <div className="text-center max-w-xl mx-auto mb-8 border-b border-slate-100 pb-4">
                <span className="text-xs font-black text-[#0000ff] uppercase tracking-widest block">INFOGRAPHIC 02</span>
                <h3 className="text-lg md:text-xl font-black text-[#2c2a2b] mt-1">HỆ THỐNG MẠCH LỌC DỮ LIỆU BẨN</h3>
              </div>

              {/* Graphical Layout - Circuits and cards */}
              <div className="grid md:grid-cols-3 gap-6 items-stretch text-xs">
                
                {/* Inputs Box */}
                <div className="p-5 bg-red-50/80 border border-red-200 rounded-2xl relative shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-[#e31f26] text-white text-[8px] font-black rounded uppercase tracking-wider">ĐẦU VÀO</span>
                    <h4 className="font-extrabold text-[#e31f26] text-sm mt-2 mb-3">Dữ Liệu Nhiễm Rác</h4>
                    <ul className="space-y-3 text-[11px] text-slate-700 font-semibold">
                      <li className="flex gap-2 items-start">
                        <span className="text-[#e31f26] font-bold">✕</span> 
                        <span>SĐT nhập lộn xộn (0901-234-567, 0987.654...)</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-[#e31f26] font-bold">✕</span> 
                        <span>Trùng dữ liệu (chữ hoa chữ thường lung tung)</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-[#e31f26] font-bold">✕</span> 
                        <span>Khuyết doanh số (Dòng trống rỗng NULL)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-4 border-t border-red-200/50 pt-3 font-semibold">
                    Hậu quả: Báo cáo sếp sai lệch hoàn toàn.
                  </div>
                </div>

                {/* Filter Engine Processor */}
                <div className="flex flex-col items-center justify-center p-6 bg-blue-50/40 border-2 border-dashed border-[#0000ff]/30 rounded-2xl text-center relative shadow-sm">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0000ff] text-white font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    BỘ LỌC SQL & EXCEL
                  </div>
                  
                  <div className="space-y-2 mt-2">
                    <span className="text-4xl animate-spin block duration-1000">⚙️</span>
                    <span className="text-xs font-black text-[#0000ff] uppercase block">Engine Xử Lý Tự Động</span>
                    <p className="text-[10px] text-slate-500 max-w-[180px] mx-auto leading-relaxed font-semibold">
                      Lập trình chuẩn hóa chuỗi ký tự thô sang mẫu lưu trữ khoa học thống nhất.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsDataCleaned(!isDataCleaned)}
                    className={`mt-6 w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                      isDataCleaned 
                        ? 'bg-[#e31f26] text-white hover:bg-red-700 shadow-[0_4px_15px_rgba(227,31,38,0.2)]' 
                        : 'bg-[#0000ff] text-white hover:bg-blue-800 shadow-[0_4px_15px_rgba(0,0,255,0.2)]'
                    }`}
                  >
                    {isDataCleaned ? "ĐƯA VỀ TRẠNG THÁI BẨN" : "BẤM ĐỂ LÀM SẠCH NGAY!"}
                  </button>
                </div>

                {/* Clean Output Box */}
                <div className="p-5 bg-blue-50/80 border border-[#0000ff]/30 rounded-2xl relative shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 bg-[#0000ff] text-white text-[8px] font-black rounded uppercase tracking-wider">ĐẦU RA CHUẨN</span>
                    <h4 className="font-extrabold text-[#0000ff] text-sm mt-2 mb-3">Dữ Liệu Sạch (Chuẩn hóa)</h4>
                    <ul className="space-y-3 text-[11px] text-slate-700 font-semibold">
                      <li className="flex gap-2 items-start">
                        <span className="text-[#0000ff] font-bold">✓</span> 
                        <span>Đồng nhất SĐT chỉ chứa số nguyên chuẩn</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-[#0000ff] font-bold">✓</span> 
                        <span>Hợp nhất bản ghi trùng lặp thông minh</span>
                      </li>
                      <li className="flex gap-2 items-start">
                        <span className="text-[#0000ff] font-bold">✓</span> 
                        <span>Khôi phục các giá trị rách bằng trung bình động</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-4 border-t border-blue-200/50 pt-3 font-semibold">
                    Kết quả: Sẵn sàng trực quan hóa Dashboard.
                  </div>
                </div>

              </div>

              {/* Clean table interactive component */}
              <div className="mt-8 overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-[#2c2a2b] font-black uppercase tracking-wider">
                      <th className="p-3.5">Khách Hàng</th>
                      <th className="p-3.5">Số Điện Thoại</th>
                      <th className="p-3.5">Ngày Giao Dịch</th>
                      <th className="p-3.5">Doanh Số</th>
                      <th className="p-3.5">Phân Nhóm Hệ Thống</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isDataCleaned ? (
                      cleanData.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 bg-white transition-all duration-300 animate-fadeIn">
                          <td className="p-3.5 font-bold text-[#0000ff]">{row.name}</td>
                          <td className="p-3.5 font-mono text-[#2c2a2b]">{row.phone}</td>
                          <td className="p-3.5 font-mono text-slate-600">{row.date}</td>
                          <td className="p-3.5 font-black text-slate-800">{row.revenue}</td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 text-[8px] font-black uppercase rounded bg-blue-100 text-[#0000ff] border border-blue-200/50">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      dirtyData.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 bg-white transition-all duration-300">
                          <td className="p-3.5 font-bold text-[#e31f26]">{row.name}</td>
                          <td className="p-3.5 font-mono text-slate-400">{row.phone}</td>
                          <td className="p-3.5 font-mono text-slate-400">{row.date}</td>
                          <td className="p-3.5 font-semibold text-slate-400">{row.revenue}</td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 text-[8px] font-black uppercase rounded bg-red-100 text-[#e31f26] border border-red-200/50">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* INFOGRAPHIC 3: VISUAL TIMELINE OF 8 HOURS */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="text-center md:text-left mb-6 border-b border-slate-100 pb-4">
                <span className="text-xs font-black text-[#0000ff] uppercase tracking-widest block">INFOGRAPHIC 03</span>
                <h3 className="text-lg md:text-xl font-black text-[#e31f26] mt-1">LỊCH TRÌNH 8 TIẾNG CÔNG VIỆC THỰC TẾ</h3>
                <p className="text-xs text-slate-500 mt-1">Click chọn các mốc thời gian để thâm nhập quy trình thực chiến của DA.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Horizontal time lines */}
                <div className="md:col-span-1 space-y-2">
                  {timelineData.map((item, idx) => {
                    const isActive = selectedTimelineSlot === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTimelineSlot(idx)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                          isActive 
                            ? 'bg-[#0000ff]/5 border-[#0000ff] shadow-sm text-[#0000ff]' 
                            : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:bg-slate-100/50 hover:text-[#2c2a2b]'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          <span className="font-extrabold block">{item.time}</span>
                          <span className="text-[11px] truncate block max-w-[180px] mt-0.5 text-[#2c2a2b]/80 font-semibold">{item.title}</span>
                        </div>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${isActive ? 'bg-[#0000ff] text-white' : 'bg-slate-200'}`}>
                          #{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Detail card of selected time slot */}
                <div className="md:col-span-2 bg-[#fcfcfc] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-[#0000ff]/3 rounded-full pointer-events-none"></div>
                  
                  <div>
                    <span className="px-3 py-1 bg-red-100 text-[#e31f26] rounded text-[9px] font-black uppercase tracking-widest">
                      CHẶNG THỜI GIAN: {timelineData[selectedTimelineSlot].time}
                    </span>
                    <h4 className="text-lg md:text-xl font-bold text-[#e31f26] mt-4 mb-3">
                      {timelineData[selectedTimelineSlot].title}
                    </h4>
                    <p className="text-xs text-[#2c2a2b] leading-relaxed mb-6 font-semibold">
                      {timelineData[selectedTimelineSlot].desc}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border-l-4 border-[#0000ff] shadow-sm text-[11px] text-slate-600 leading-relaxed font-semibold">
                    <span className="font-extrabold text-[#2c2a2b] block mb-1">💡 Bí kíp thực chiến MindX:</span>
                    Tại chặng này, DA không chỉ thu mình gõ lệnh thô. Bạn luôn phải phối hợp phân tích với team nghiệp vụ để tối ưu các bước đưa thông điệp chính xác nhất đến sếp.
                  </div>
                </div>

              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setActiveTab('welcome')} 
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                <span>Trở lại Phần 1</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('domain-skills')} 
                className="px-6 py-3 bg-[#0000ff] hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>Xem Bản đồ năng lực kỹ năng</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

          </div>
        )}

        {/* ==================== TAB 3: BẢN ĐỒ NĂNG LỰC & DOMAIN ADVANTAGE ==================== */}
        {activeTab === 'domain-skills' && (
          <div className="space-y-10 animate-fadeIn">
            
            {/* Domain selector introduction header */}
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-[-30px] right-[-30px] w-36 h-36 bg-[#0000ff]/3 rounded-full pointer-events-none"></div>
              <span className="text-xs font-black text-[#0000ff] uppercase tracking-widest block">LỢI THẾ CẠNH TRANH ĐỘC QUYỀN</span>
              <h2 className="text-xl md:text-2xl font-black text-[#e31f26] mt-1">Domain Knowledge: Vũ Khí Phi-IT Cực Kỳ Lợi Hại</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-semibold">
                Sự thấu hiểu tâm lý khách hàng, phễu quảng cáo, hay luồng hóa đơn của công việc cũ giúp bạn xử lý số liệu nhanh hơn bất kỳ ai. Hãy bấm chọn mảng chuyên môn cũ dưới đây để khai phá vũ khí bí mật của bạn:
              </p>
            </div>

            {/* Quick selectors with highly visible hover and active states */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(domains).map((key) => {
                const isActive = selectedDomain === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDomain(key)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-center flex flex-col items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-[#0000ff]/5 border-[#0000ff] text-[#0000ff] shadow-md scale-[1.02]' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-3xl">
                      {key === 'marketing' && "🛍️"}
                      {key === 'advertising' && "📣"}
                      {key === 'finance' && "💰"}
                      {key === 'logistics' && "📦"}
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider block mt-1">{domains[key].title}</span>
                  </button>
                );
              })}
            </div>

            {/* INFOGRAPHIC 4: THE GLASS PYRAMID OF SKILLS */}
            <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="text-center max-w-xl mx-auto mb-8 border-b border-slate-100 pb-4">
                <span className="text-xs font-black text-[#0000ff] uppercase tracking-widest block">INFOGRAPHIC 04</span>
                <h3 className="text-lg md:text-xl font-black text-[#2c2a2b] mt-1">THÁP CHỒNG NĂNG LỰC DA ĐÀO TẠO THỰC CHIẾN</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                
                {/* 3D Glass Stacked Block Diagram */}
                <div className="flex flex-col gap-3">
                  
                  {/* Tier 1 */}
                  <div className="bg-gradient-to-r from-[#e31f26] to-[#e31f26]/80 text-white p-4 rounded-xl text-center font-black text-xs shadow-md transform hover:scale-[1.01] transition-all">
                    1. DATA STORYTELLING (ĐỈNH THÁP)
                    <p className="text-[10px] font-medium text-red-100 mt-1">Truyền đạt thông điệp kinh doanh súc tích tới Ban Giám Đốc</p>
                  </div>

                  {/* Tier 2 */}
                  <div className="bg-gradient-to-r from-[#0000ff] to-[#0000ff]/85 text-white p-4 rounded-xl text-center font-black text-xs shadow-md transform hover:scale-[1.01] transition-all">
                    2. POWER BI & VISUALIZATION (TRUNG CẤP)
                    <p className="text-[10px] font-medium text-blue-100 mt-1">Xây dựng biểu đồ phân tích tự động, tương tác trực quan</p>
                  </div>

                  {/* Tier 3 */}
                  <div className="bg-slate-800 text-white p-4 rounded-xl text-center font-black text-xs shadow-md transform hover:scale-[1.01] transition-all">
                    3. SQL & POWER QUERY (CÔNG CỤ NỀN)
                    <p className="text-[10px] font-medium text-slate-300 mt-1">Truy vấn, dọn dẹp và liên kết hàng triệu dòng số liệu</p>
                  </div>

                  {/* Tier 4 */}
                  <div className="bg-slate-100 border-2 border-slate-300 text-[#2c2a2b] p-5 rounded-xl text-center font-black text-xs shadow-md transform hover:scale-[1.01] transition-all">
                    4. DOMAIN KNOWLEDGE - NGHIỆP VỤ (BẢN VẼ MÓNG VỮNG CHẮC)
                    <p className="text-[10px] font-medium text-slate-600 mt-1">Kiến thức chuyên môn ngành sẵn có trong quá khứ của bạn</p>
                  </div>

                </div>

                {/* Explanatory Advantage Text panel of selected domain */}
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 bg-blue-100 text-[#0000ff] text-[9px] font-black uppercase rounded tracking-widest inline-block mb-2">
                      LĨNH VỰC THẾ MẠNH
                    </span>
                    <h4 className="text-xl md:text-2xl font-black text-[#e31f26]">{domains[selectedDomain].title}</h4>
                    <p className="text-xs text-[#2c2a2b] mt-2 font-semibold leading-relaxed">
                      Sức mạnh độc quyền sẵn có: <span className="text-[#0000ff] font-extrabold">{domains[selectedDomain].weapon}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Câu hỏi nghiệp vụ sẽ xử lý:</span>
                    {domains[selectedDomain].questions.map((q, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#2c2a2b] font-semibold flex gap-2">
                        <span className="text-[#0000ff] font-extrabold">Q{idx+1}.</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-blue-50/40 border border-[#0000ff]/20 rounded-xl">
                    <span className="text-[10px] font-black text-[#0000ff] block uppercase tracking-wider">CHỈ SỐ DOANH NGHIỆP BẠN SẼ QUẢN LÝ:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {domains[selectedDomain].kpis.map((kpi, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white text-xs text-slate-800 font-bold border border-slate-200 rounded-lg shadow-sm">
                          {kpi}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setActiveTab('day-in-life')} 
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                <span>Trở lại Phần 2</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('suitability-quiz')} 
                className="px-6 py-3 bg-[#0000ff] hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>Bắt đầu tự trắc nghiệm đánh giá</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

          </div>
        )}

        {/* ==================== TAB 4: TRẮC NGHIỆM PHÙ HỢP ==================== */}
        {activeTab === 'suitability-quiz' && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-[-30px] right-[-30px] w-36 h-36 bg-[#e31f26]/3 rounded-full pointer-events-none"></div>
              <span className="text-xs font-black text-[#e31f26] uppercase tracking-widest block">ĐÁNH GIÁ TỐ CHẤT</span>
              <h2 className="text-xl md:text-2xl font-black text-[#e31f26] mt-1">Trắc Nghiệm Tự Đánh Giá Mức Độ Phù Hợp</h2>
              <p className="text-xs text-slate-600 mt-2 font-semibold">
                Hãy tích chọn các đặc trưng tính cách cá nhân dưới đây để hệ thống tự động trả kết quả phân loại từ MindX.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              
              {/* Question checks list */}
              <div className="md:col-span-3 space-y-3 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                {[
                  { key: 'q1', text: 'Tính tò mò tự nhiên: Bạn luôn muốn đào bới nguyên nhân khi thấy lượng tương tác, bán hàng tăng giảm đột biến.' },
                  { key: 'q2', text: 'Cẩn trọng chi tiết: Sẵn sàng ngồi dò tìm khoảng trống Null hoặc lỗi sai cú pháp trên Excel.' },
                  { key: 'q3', text: 'Thích đơn giản hóa: Bạn có khả năng chuyển hóa vấn đề công nghệ rắc rối thành ngôn từ phổ thông dễ hiểu.' },
                  { key: 'q4', text: 'Tôn trọng số liệu thực: Cảm thấy tự tin hơn khi đề xuất cải tiến dựa trên bằng chứng dữ liệu rõ ràng.' },
                  { key: 'q5', text: 'Excel cơ bản: Đã từng tự tạo bộ lọc tính toán, có khát khao nâng cấp tự động hóa quy trình.' },
                  { key: 'q6', text: 'Chủ động tìm kiếm giải pháp: Thích gõ hỏi Google, tìm tòi sửa lỗi phần mềm khi tự học.' },
                  { key: 'q7', text: 'Yêu thích nghiệp vụ: Bạn quan tâm cấu trúc mô hình tăng trưởng dòng tiền hơn là gõ code một xó.' }
                ].map((item, idx) => (
                  <label
                    key={item.key}
                    onClick={() => handleQuizToggle(item.key)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      quizSelections[item.key]
                        ? 'bg-[#0000ff]/5 border-[#0000ff] text-[#2c2a2b]'
                        : 'bg-slate-50/50 border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <input 
                      type="checkbox"
                      checked={quizSelections[item.key]}
                      onChange={() => {}}
                      className="mt-1 rounded border-slate-300 text-[#0000ff] focus:ring-[#0000ff]"
                    />
                    <div className="text-xs leading-relaxed select-none font-semibold">
                      <span className="font-extrabold text-[#e31f26] block mb-0.5">Tiêu chí {idx+1}:</span>
                      {item.text}
                    </div>
                  </label>
                ))}
              </div>

              {/* Dynamic results sidebar */}
              <div className="md:col-span-2 space-y-6">
                
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center shadow-inner">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">ĐIỂM ĐỒNG BỘ NĂNG LỰC</span>
                  
                  <div className="my-6 flex justify-center">
                    <div className="w-28 h-28 rounded-full border-4 border-[#0000ff]/20 flex flex-col justify-center items-center bg-white shadow-sm">
                      <span className="text-4xl font-black text-[#0000ff]">{quizScore}</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">/ 7 Tiêu chí</span>
                    </div>
                  </div>

                  {quizScore >= 5 && (
                    <div className="space-y-2 animate-fadeIn">
                      <span className="px-3 py-1 bg-blue-100 text-[#0000ff] text-[10px] font-black rounded-full uppercase tracking-wider block w-max mx-auto">
                        CỰC KỲ PHÙ HỢP!
                      </span>
                      <p className="text-xs text-[#2c2a2b] font-semibold leading-relaxed">
                        Bạn có tố chất phân tích thiên bẩm. Chỉ cần hệ thống hóa công cụ thực hành (SQL, Power BI), bạn sẽ đi rất xa!
                      </p>
                    </div>
                  )}

                  {quizScore >= 3 && quizScore <= 4 && (
                    <div className="space-y-2 animate-fadeIn">
                      <span className="px-3 py-1 bg-amber-100 text-amber-600 text-[10px] font-black rounded-full uppercase tracking-wider block w-max mx-auto">
                        TIỀM NĂNG PHÁT TRIỂN
                      </span>
                      <p className="text-xs text-[#2c2a2b] font-semibold leading-relaxed">
                        Tiềm năng lớn nhưng cần lộ trình chặt chẽ để rèn dũa khả năng phân tích nghiệp vụ, có Mentor dẫn dắt bài bản.
                      </p>
                    </div>
                  )}

                  {quizScore < 3 && (
                    <div className="space-y-2 animate-fadeIn">
                      <span className="px-3 py-1 bg-red-100 text-[#e31f26] text-[10px] font-black rounded-full uppercase tracking-wider block w-max mx-auto">
                        HƯỚNG ĐI IT-BA
                      </span>
                      <p className="text-xs text-[#2c2a2b] font-semibold leading-relaxed">
                        Làm việc chi tiết số thô có thể gây khô khan. Bạn nên cân nhắc mảng <strong>IT Business Analyst</strong> nhé!
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-blue-50/50 border border-blue-200 rounded-3xl shadow-sm">
                  <h4 className="text-xs font-black text-[#0000ff] uppercase block mb-1">Thiết lập thế mạnh riêng biệt?</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-semibold">
                    Nhận ngay bảng phân tích chi tiết ưu nhược điểm miễn phí cùng chuyên gia định hướng MindX.
                  </p>
                  <button
                    onClick={() => setActiveTab('cta')}
                    className="w-full py-3 bg-[#0000ff] hover:bg-blue-800 text-white font-black uppercase text-xs rounded-xl tracking-wider transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,255,0.15)]"
                  >
                    Đăng Ký Tư Vấn 1-1 Miễn Phí
                  </button>
                </div>

              </div>

            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setActiveTab('domain-skills')} 
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                <span>Trở lại Phần 3</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('roadmap')} 
                className="px-6 py-3 bg-[#0000ff] hover:bg-blue-800 text-white font-extrabold rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>Mở Lộ Trình Hành Động 90 Ngày</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

          </div>
        )}

        {/* ==================== TAB 5: LỘ TRÌNH 90 NGÀY ==================== */}
        {activeTab === 'roadmap' && (
          <div className="space-y-10 animate-fadeIn">
            
            <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <span className="text-xs font-black text-[#0000ff] uppercase tracking-widest block">INFOGRAPHIC 05</span>
                  <h2 className="text-2xl font-black text-[#e31f26] mt-1">Lộ Trình Hành Động 90 Ngày Cho Người Trái Ngành</h2>
                  <p className="text-xs text-slate-600 mt-2 font-medium">
                    Từng tuần thực chiến kiến tạo Portfolio xin việc chất lượng hàng đầu.
                  </p>
                </div>

                {/* Progress bar info widget */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shrink-0 w-full md:w-auto shadow-inner">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-extrabold text-[#2c2a2b]">ĐỘ CHUẨN BỊ XIN VIỆC:</span>
                    <span className="text-xs font-black text-[#0000ff]">{roadmapProgressPercent}%</span>
                  </div>
                  <div className="w-full md:w-48 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#0000ff] h-full transition-all duration-300" style={{ width: `${roadmapProgressPercent}%` }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-1.5 text-center font-semibold">Tích chọn các đầu việc đã học xong ở dưới!</span>
                </div>
              </div>
            </div>

            {/* Three Blocks Timeline of 90 Days */}
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Block 1 */}
              <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm hover:border-[#e31f26]/30 transition-all duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <span className="px-2.5 py-1 bg-red-100 text-[#e31f26] rounded text-[9px] font-black uppercase tracking-wider block w-max">
                    TUẦN 1 - 4
                  </span>
                  <h3 className="text-base font-black text-[#e31f26] mt-2">SQL & Excel Nâng Cao</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 't1', label: 'Tự động hóa gộp dữ liệu bằng Excel Power Query' },
                    { key: 't2', label: 'Làm chủ các lệnh SQL cơ bản: SELECT, WHERE, JOIN, GROUP BY' },
                    { key: 't3', label: 'Thiết kế sơ đồ quan hệ cơ sở dữ liệu (ERD)' },
                    { key: 't4', label: 'Dự án: Dọn sạch file nhập liệu sai chuẩn của chuỗi bán lẻ' }
                  ].map((task) => (
                    <label 
                      key={task.key}
                      onClick={() => handleTaskToggle(task.key)}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        completedTasks[task.key]
                          ? 'bg-blue-50/50 border-[#0000ff] text-[#2c2a2b]'
                          : 'bg-slate-50/40 border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={completedTasks[task.key]}
                        onChange={() => {}}
                        className="mt-1 rounded text-[#0000ff] border-slate-300 focus:ring-[#0000ff]"
                      />
                      <span className="text-xs select-none font-semibold">{task.label}</span>
                    </label>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 border border-slate-200 leading-relaxed font-semibold">
                  <strong>Sản phẩm đạt được:</strong> File dữ liệu bán hàng chuẩn + mã code SQL sạch tinh gọn sẵn sàng đẩy vào báo cáo.
                </div>
              </div>

              {/* Block 2 */}
              <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm hover:border-[#0000ff]/30 transition-all duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <span className="px-2.5 py-1 bg-blue-100 text-[#0000ff] rounded text-[9px] font-black uppercase tracking-wider block w-max">
                    TUẦN 5 - 8
                  </span>
                  <h3 className="text-base font-black text-[#e31f26] mt-2">Power BI & Nghiệp Vụ</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 't5', label: 'Kết nối dữ liệu từ SQL trực tiếp sang Power BI' },
                    { key: 't6', label: 'Thiết kế bố cục trực quan, UX/UI tinh gọn chuẩn sếp' },
                    { key: 't7', label: 'Làm quen các bộ KPIs: CAC, ROI, AOV, Churn Rate' },
                    { key: 't8', label: 'Dự án: Xây dựng Dashboard báo cáo tự động' }
                  ].map((task) => (
                    <label 
                      key={task.key}
                      onClick={() => handleTaskToggle(task.key)}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        completedTasks[task.key]
                          ? 'bg-blue-50/50 border-[#0000ff] text-[#2c2a2b]'
                          : 'bg-slate-50/40 border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={completedTasks[task.key]}
                        onChange={() => {}}
                        className="mt-1 rounded text-[#0000ff] border-slate-300 focus:ring-[#0000ff]"
                      />
                      <span className="text-xs select-none font-semibold">{task.label}</span>
                    </label>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 border border-slate-200 leading-relaxed font-semibold">
                  <strong>Sản phẩm đạt được:</strong> Dashboard tương tác động đa chiều, hỗ trợ bộ lọc tự động theo các phân nhánh nghiệp vụ.
                </div>
              </div>

              {/* Block 3 */}
              <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm hover:border-amber-500/30 transition-all duration-300">
                <div className="border-b border-slate-100 pb-3">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-600 rounded text-[9px] font-black uppercase tracking-wider block w-max">
                    TUẦN 9 - 12
                  </span>
                  <h3 className="text-base font-black text-[#e31f26] mt-2">Xây Dựng Portfolio</h3>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 't9', label: 'Chọn bộ dữ liệu thật thuộc mảng ngành cũ thế mạnh' },
                    { key: 't10', label: 'Phân tích tổng quan, đúc kết 3 phương án cải tiến súc tích' },
                    { key: 't11', label: 'Đưa mã nguồn lên GitHub, hoàn tất CV định vị chuyên gia' }
                  ].map((task) => (
                    <label 
                      key={task.key}
                      onClick={() => handleTaskToggle(task.key)}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        completedTasks[task.key]
                          ? 'bg-blue-50/50 border-[#0000ff] text-[#2c2a2b]'
                          : 'bg-slate-50/40 border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={completedTasks[task.key]}
                        onChange={() => {}}
                        className="mt-1 rounded text-[#0000ff] border-slate-300 focus:ring-[#0000ff]"
                      />
                      <span className="text-xs select-none font-semibold">{task.label}</span>
                    </label>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-[10px] text-slate-500 border border-slate-200 leading-relaxed font-semibold">
                  <strong>Sản phẩm đạt được:</strong> Hồ sơ GitHub cá nhân uy tín, hiển thị đầy đủ trực quan năng lực đàm phán giải quyết số liệu.
                </div>
              </div>

            </div>

            {/* General Conclusion with Dual Gradient Ribbon Accent */}
            <div className="p-6 bg-white border-2 border-slate-200 rounded-3xl text-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#e31f26]"></div>
              <div className="absolute top-0 right-0 w-2 h-full bg-[#0000ff]"></div>
              <span className="text-xs font-black text-[#e31f26] tracking-widest uppercase block mb-1">CƠ HỘI ĐANG CHỜ ĐÓN BẠN</span>
              <p className="max-w-3xl mx-auto text-sm text-[#2c2a2b] font-semibold leading-relaxed">
                Đừng ngần ngại vì xuất phát điểm trái ngành. Trong kỷ nguyên AI 2026, tư duy nghiệp vụ và kỹ năng đặt câu hỏi mới là chiếc chìa khóa vàng đưa bạn bứt phá. Hãy để MindX đồng hành mài giũa vũ khí của bạn.
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setActiveTab('suitability-quiz')} 
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                <span>Trở lại Phần 4</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('cta')} 
                className="px-6 py-3.5 bg-[#0000ff] hover:bg-blue-800 text-white font-black rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>ĐĂNG KÝ THIẾT KẾ LỘ TRÌNH MIỄN PHÍ</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

          </div>
        )}

        {/* ==================== CTA CONSULTING FORM SECTION ==================== */}
        {activeTab === 'cta' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-[0_15px_40px_rgba(0,0,255,0.04)] animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-50 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="text-center mb-8">
              <span className="px-3.5 py-1 bg-red-100 text-[#e31f26] text-[10px] font-black tracking-widest uppercase rounded">
                MINDX CONSULTING PATHWAY
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#e31f26] mt-4">Tư Vấn Thiết Kế Lộ Trình 1-1 Cá Nhân Hóa</h2>
              <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed font-semibold">
                Tối ưu hóa kinh nghiệm cũ của bạn để định hướng nhánh phân tích phù hợp nhất. Điền thông tin bên dưới và chuyên gia sẽ liên lạc với bạn trong 24 giờ làm việc.
              </p>
            </div>

            {submittingStatus === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-blue-100 text-[#0000ff] rounded-full flex justify-center items-center text-2xl font-bold mx-auto">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-800">Đăng ký thông tin thành công!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-semibold">
                  Cảm ơn bạn đã tin tưởng. Chuyên viên đào tạo của MindX đã nhận được dữ liệu của bạn và sẽ gọi hỗ trợ định hướng sớm nhất.
                </p>
                <button
                  onClick={() => { setSubmittingStatus('idle'); setActiveTab('welcome'); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all duration-300"
                >
                  Quay lại Trang Chủ
                </button>
              </div>
            ) : submittingStatus === 'error' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-red-100 text-[#e31f26] rounded-full flex justify-center items-center text-2xl font-bold mx-auto">
                  ✕
                </div>
                <h3 className="text-lg font-bold text-slate-800">Gửi thông tin không thành công!</h3>
                <p className="text-xs text-slate-550 max-w-xs mx-auto leading-relaxed font-semibold">
                  Đã có lỗi xảy ra trong quá trình truyền dữ liệu về hệ thống MindX. Bạn vui lòng kiểm tra kết nối mạng và thử lại.
                </p>
                <button
                  onClick={() => setSubmittingStatus('idle')}
                  className="px-5 py-2.5 bg-[#e31f26] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all duration-300 shadow-md"
                >
                  Thử gửi lại
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegSubmit} className="space-y-4 text-xs">
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black block mb-1.5">HỌ VÀ TÊN *</label>
                    <input
                      type="text"
                      required
                      value={regForm.fullName}
                      onChange={(e) => setRegForm(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#2c2a2b] focus:outline-none focus:border-[#0000ff] focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  
                  <div>
                    <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black block mb-1.5">SỐ ĐIỆN THOẠI *</label>
                    <input
                      type="tel"
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="09XXXXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#2c2a2b] focus:outline-none focus:border-[#0000ff] focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black block mb-1.5">ĐỊA CHỈ EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={regForm.email}
                    onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="nguyenvana@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#2c2a2b] focus:outline-none focus:border-[#0000ff] focus:bg-white transition-all font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black block mb-1.5">NỀN TẢNG XUẤT PHÁT ĐIỂM HIỆN TẠI</label>
                  <select
                    value={regForm.experience}
                    onChange={(e) => setRegForm(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#2c2a2b] focus:outline-none focus:border-[#0000ff] focus:bg-white transition-all font-bold"
                  >
                    <option value="non-it-worker">Người đi làm trái ngành (Kế toán, Marketing, Sales, CSKH...)</option>
                    <option value="student">Sinh viên khối ngành Kinh tế / Quản trị sắp ra trường</option>
                    <option value="self-taught">Người đang tự học Data Analyst nhưng bế tắc công cụ</option>
                    <option value="other">Trường hợp khác</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black block mb-1.5">CÂU HỎI EM MUỐN ĐẶT CHO CHUYÊN GIA (NẾU CÓ)</label>
                  <textarea
                    rows="3"
                    value={regForm.message}
                    onChange={(e) => setRegForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Ví dụ: Em muốn tận dụng 3 năm kinh nghiệm làm Logistics để tối ưu mảng Supply Chain DA..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-[#2c2a2b] focus:outline-none focus:border-[#0000ff] focus:bg-white transition-all resize-none font-semibold"
                  ></textarea>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submittingStatus === 'loading'}
                    className="w-full py-4 bg-[#0000ff] hover:bg-blue-850 text-white font-black rounded-xl text-xs tracking-widest uppercase transition-all shadow-[0_5px_15px_rgba(0,0,255,0.2)] disabled:opacity-50"
                  >
                    {submittingStatus === 'loading' ? 'ĐANG GỬI THÔNG TIN...' : 'ĐĂNG KÝ TƯ VẤN NGAY'}
                  </button>
                </div>

                <span className="text-[9px] text-slate-400 block text-center mt-3">
                  🔒 MindX cam kết bảo mật 100% dữ liệu thông tin cá nhân khách hàng.
                </span>

              </form>
            )}

          </div>
        )}

      </div>

      {/* Footer block */}
      <footer className="mt-24 border-t border-slate-200 bg-slate-100 py-12 text-xs text-slate-500 relative z-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 font-semibold">
          <div>
            <h4 className="text-sm font-black text-[#2c2a2b] mb-3 uppercase tracking-wider">Học Viện Công Nghệ Thực Chiến MindX</h4>
            <p className="leading-relaxed mb-4 max-w-sm font-semibold">
              Đơn vị hàng đầu Việt Nam cung cấp giải pháp hướng nghiệp, đào tạo phân tích dữ liệu ứng dụng AI thực chiến.
            </p>
            <span className="block text-[10px] font-bold">© 2026 MindX Technology Academy. All rights reserved.</span>
          </div>
          <div>
            <h4 className="text-sm font-black text-[#2c2a2b] mb-3 uppercase tracking-wider">Tài liệu tham chiếu chuẩn ngành</h4>
            <ul className="space-y-2 text-[11px] text-slate-500 font-semibold">
              <li>• Báo cáo Tuyển dụng IT Việt Nam - <strong className="text-slate-700">TopDev</strong></li>
              <li>• Thống kê Mức lương ngành Công nghệ Việt Nam - <strong className="text-slate-700">ITviec</strong></li>
              <li>• Báo cáo Phân bổ Dữ liệu Toàn cầu - <strong className="text-slate-700">Anaconda State of Data Science</strong></li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}