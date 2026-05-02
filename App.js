import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const colors = {
  teal: '#2BA3A3',
  tealDark: '#0A6E6E',
  tealLight: '#E6F2F2',
  green: '#12B886',
  marigold: '#F5A623',
  info: '#1971C2',
  warning: '#E67700',
  error: '#D9480F',
  ink: '#142423',
  muted: '#60706E',
  line: '#DDEAE8',
  white: '#FFFFFF',
  surface: '#F7FBFA'
};

const screens = [
  'Splash',
  'Sign Up',
  'Login',
  'Business Type',
  'Business Details',
  'Electricity',
  'LPG',
  'Waste',
  'Result',
  'Marketplace',
  'Project Detail',
  'Purchase',
  'Payment',
  'Success',
  'Dashboard',
  'Learn',
  'Profile'
];

const businessTypes = [
  ['Cafe', 'cafe-outline'],
  ['Restaurant', 'silverware-fork-knife'],
  ['Bakery', 'cupcake'],
  ['Cloud Kitchen', 'chef-hat'],
  ['Other', 'store-outline']
];

const cities = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'];
const revenueRanges = ['< ₹5L', '₹5L-₹15L', '₹15L-₹40L', '₹40L+'];
const wasteRanges = ['<5 kg', '5-15 kg', '15+ kg'];
const apps = ['Zomato', 'Swiggy', 'Own delivery'];
const filters = ['Forest', 'Solar', 'Biogas'];

const projects = [
  {
    title: 'Western Ghats Forest Revival',
    location: 'Karnataka',
    price: '₹820 / ton',
    type: 'Forest',
    icon: 'tree-outline',
    color: '#E8F7EE'
  },
  {
    title: 'Rajasthan Solar Microgrid',
    location: 'Jodhpur',
    price: '₹760 / ton',
    type: 'Solar',
    icon: 'solar-power',
    color: '#FFF5DD'
  },
  {
    title: 'Pune Food Waste Biogas',
    location: 'Maharashtra',
    price: '₹690 / ton',
    type: 'Biogas',
    icon: 'recycle',
    color: '#E6F2F2'
  }
];

const articles = [
  ['Basics', 'Carbon offsetting in plain English'],
  ['Carbon credits', 'How verified projects are checked'],
  ['Policy', 'What Indian small businesses should know']
];

export default function App() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [businessType, setBusinessType] = useState('Cafe');
  const [employees, setEmployees] = useState(6);
  const [city, setCity] = useState('Bengaluru');
  const [revenue, setRevenue] = useState('₹5L-₹15L');
  const [lpg, setLpg] = useState(4);
  const [png, setPng] = useState(false);
  const [waste, setWaste] = useState('5-15 kg');
  const [delivery, setDelivery] = useState(true);
  const [deliveryApp, setDeliveryApp] = useState('Zomato');
  const [filter, setFilter] = useState('Forest');
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [payment, setPayment] = useState('GPay');

  const screenName = screens[screenIndex];
  const progress = useMemo(() => Math.round(((screenIndex + 1) / screens.length) * 100), [screenIndex]);

  const goNext = () => setScreenIndex((value) => Math.min(value + 1, screens.length - 1));
  const goBack = () => setScreenIndex((value) => Math.max(value - 1, 0));
  const goTo = (name) => setScreenIndex(screens.indexOf(name));

  const shared = {
    goNext,
    goBack,
    goTo,
    businessType,
    setBusinessType,
    employees,
    setEmployees,
    city,
    setCity,
    revenue,
    setRevenue,
    lpg,
    setLpg,
    png,
    setPng,
    waste,
    setWaste,
    delivery,
    setDelivery,
    deliveryApp,
    setDeliveryApp,
    filter,
    setFilter,
    selectedProject,
    setSelectedProject,
    payment,
    setPayment
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      <View style={styles.appShell}>
        {screenIndex > 0 && (
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.iconButton} onPress={goBack} activeOpacity={0.75}>
              <Ionicons name="chevron-back" size={22} color={colors.tealDark} />
            </TouchableOpacity>
            <View style={styles.topTitleWrap}>
              <Text style={styles.topTitle}>{screenName}</Text>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </View>
          </View>
        )}
        <ScrollView contentContainerStyle={[styles.content, screenIndex >= 14 && styles.withNav]} showsVerticalScrollIndicator={false}>
          {renderScreen(screenName, shared)}
        </ScrollView>
        {screenIndex >= 14 && <BottomNav active={screenName} goTo={goTo} />}
      </View>
    </SafeAreaView>
  );
}

function renderScreen(name, props) {
  switch (name) {
    case 'Splash':
      return <Splash {...props} />;
    case 'Sign Up':
      return <Signup {...props} />;
    case 'Login':
      return <Login {...props} />;
    case 'Business Type':
      return <BusinessType {...props} />;
    case 'Business Details':
      return <BusinessDetails {...props} />;
    case 'Electricity':
      return <Electricity {...props} />;
    case 'LPG':
      return <Lpg {...props} />;
    case 'Waste':
      return <Waste {...props} />;
    case 'Result':
      return <Result {...props} />;
    case 'Marketplace':
      return <Marketplace {...props} />;
    case 'Project Detail':
      return <ProjectDetail {...props} />;
    case 'Purchase':
      return <Purchase {...props} />;
    case 'Payment':
      return <Payment {...props} />;
    case 'Success':
      return <Success {...props} />;
    case 'Dashboard':
      return <Dashboard {...props} />;
    case 'Learn':
      return <Learn {...props} />;
    case 'Profile':
      return <Profile {...props} />;
    default:
      return null;
  }
}

function Splash({ goNext, goTo }) {
  return (
    <View style={styles.heroScreen}>
      <View style={styles.logoRow}>
        <View style={styles.logoMark}>
          <MaterialCommunityIcons name="leaf" size={28} color={colors.white} />
        </View>
        <Text style={styles.logoText}>GreenMark</Text>
      </View>
      <View style={styles.illustration}>
        <View style={styles.sun} />
        <View style={styles.shop}>
          <View style={styles.awning} />
          <Text style={styles.shopText}>Eco Cafe</Text>
          <View style={styles.shopWindows}>
            <View style={styles.window} />
            <View style={styles.window} />
          </View>
        </View>
        <View style={styles.treeLeft} />
        <View style={styles.treeRight} />
      </View>
      <View style={styles.bottomHero}>
        <Text style={styles.h1}>Make Your Business Carbon Neutral</Text>
        <Text style={styles.bodyLarge}>Measure emissions, offset them with verified Indian projects, and share proof customers can trust.</Text>
        <PrimaryButton label="Get Started" onPress={goNext} />
        <SecondaryButton label="I already have an account" onPress={() => goTo('Login')} />
      </View>
    </View>
  );
}

function Signup({ goNext }) {
  return (
    <ScreenIntro title="Create your GreenMark account" text="Start with the quickest setup. You can refine details later." icon="person-add-outline">
      <ActionTile icon="logo-google" title="Continue with Google" subtitle="Recommended for fastest signup" />
      <Divider />
      <Field label="Business Name" value="Fresh Leaf Cafe" />
      <Field label="Email" value="owner@freshleaf.in" />
      <Field label="Password" value="••••••••" secure />
      <Field label="Confirm Password" value="••••••••" secure />
      <PrimaryButton label="Create Account" onPress={goNext} />
    </ScreenIntro>
  );
}

function Login({ goNext }) {
  return (
    <ScreenIntro title="Welcome back" text="Pick up where your climate journey paused." icon="log-in-outline">
      <Field label="Email" value="owner@freshleaf.in" />
      <Field label="Password" value="••••••••" secure />
      <TouchableOpacity activeOpacity={0.75}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
      <PrimaryButton label="Login" onPress={goNext} />
    </ScreenIntro>
  );
}

function BusinessType({ businessType, setBusinessType, goNext }) {
  return (
    <ScreenIntro title="What kind of business do you run?" text="This helps us estimate your footprint more accurately." icon="storefront-outline">
      <View style={styles.grid}>
        {businessTypes.map(([label, icon]) => (
          <TouchableOpacity
            key={label}
            style={[styles.choiceCard, businessType === label && styles.choiceCardActive]}
            onPress={() => setBusinessType(label)}
            activeOpacity={0.75}
          >
            <MaterialCommunityIcons name={icon} size={28} color={businessType === label ? colors.white : colors.tealDark} />
            <Text style={[styles.choiceText, businessType === label && styles.choiceTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <PrimaryButton label="Continue" onPress={goNext} />
    </ScreenIntro>
  );
}

function BusinessDetails({ employees, setEmployees, city, setCity, revenue, setRevenue, goNext }) {
  return (
    <ScreenIntro title="A few business details" text="Simple inputs only. No accounting spreadsheet energy here." icon="business-outline">
      <Field label="Business name" value="Fresh Leaf Cafe" />
      <Text style={styles.label}>City</Text>
      <ChipRow values={cities} selected={city} onSelect={setCity} />
      <Stepper label="Employees" value={employees} setValue={setEmployees} min={1} />
      <Text style={styles.label}>Revenue range</Text>
      <ChipRow values={revenueRanges} selected={revenue} onSelect={setRevenue} />
      <TrustNote text="Your data is private and never shared." />
      <PrimaryButton label="Continue" onPress={goNext} />
    </ScreenIntro>
  );
}

function Electricity({ goNext }) {
  return (
    <ScreenIntro title="Monthly electricity use" text="Add your bill units or use a typical estimate for cafes." icon="flash-outline">
      <Field label="Electricity units" value="620 kWh" helper="Typical cafe uses 400-800 units per month" keyboardType="number-pad" />
      <ActionTile icon="sparkles-outline" title="Use average" subtitle="We will estimate from your business type and team size" />
      <PrimaryButton label="Continue" onPress={goNext} />
    </ScreenIntro>
  );
}

function Lpg({ lpg, setLpg, png, setPng, goNext }) {
  return (
    <ScreenIntro title="Cooking fuel" text="Tell us how much LPG or PNG your kitchen uses." icon="flame-outline">
      <Stepper label="LPG cylinders per month" value={lpg} setValue={setLpg} min={0} />
      <Toggle label="Do you use PNG?" value={png} setValue={setPng} />
      <PrimaryButton label="Continue" onPress={goNext} />
    </ScreenIntro>
  );
}

function Waste({ waste, setWaste, delivery, setDelivery, deliveryApp, setDeliveryApp, goNext }) {
  return (
    <ScreenIntro title="Waste and delivery" text="Last step. Choose what best matches a normal day." icon="bicycle-outline">
      <Text style={styles.label}>Daily food waste</Text>
      <ChipRow values={wasteRanges} selected={waste} onSelect={setWaste} />
      <Toggle label="Do you offer delivery?" value={delivery} setValue={setDelivery} />
      {delivery && (
        <>
          <Text style={styles.label}>Delivery channels</Text>
          <ChipRow values={apps} selected={deliveryApp} onSelect={setDeliveryApp} />
        </>
      )}
      <PrimaryButton label="Calculate My Footprint" onPress={goNext} />
    </ScreenIntro>
  );
}

function Result({ goNext }) {
  return (
    <ScreenIntro title="Your estimated footprint" text="A clear yearly number you can act on today." icon="analytics-outline">
      <View style={styles.resultCard}>
        <Text style={styles.bigNumber}>8.4</Text>
        <Text style={styles.tons}>tons CO2/year</Text>
        <View style={styles.gauge}>
          <View style={styles.gaugeFill} />
        </View>
        <Text style={styles.comparison}>12% less than similar cafes in your city</Text>
      </View>
      <PrimaryButton label="Offset My Emissions" onPress={goNext} />
      <SecondaryButton label="Save Report" onPress={() => {}} />
    </ScreenIntro>
  );
}

function Marketplace({ filter, setFilter, setSelectedProject, goNext }) {
  const visible = projects.filter((project) => project.type === filter);
  return (
    <ScreenIntro title="Choose verified offsets" text="Support real projects with simple pricing and proof." icon="leaf-outline">
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={colors.muted} />
        <Text style={styles.searchText}>Search projects</Text>
      </View>
      <ChipRow values={filters} selected={filter} onSelect={setFilter} />
      {(visible.length ? visible : projects).map((project) => (
        <ProjectCard
          key={project.title}
          project={project}
          onPress={() => {
            setSelectedProject(project);
            goNext();
          }}
        />
      ))}
    </ScreenIntro>
  );
}

function ProjectDetail({ selectedProject, goNext }) {
  return (
    <ScreenIntro title={selectedProject.title} text="Verified project with measurable climate and community impact." icon={selectedProject.icon} community>
      <View style={[styles.projectHero, { backgroundColor: selectedProject.color }]}>
        <MaterialCommunityIcons name={selectedProject.icon} size={74} color={colors.tealDark} />
      </View>
      <View style={styles.statsGrid}>
        <MiniStat label="CO2 offset" value="1,240t" />
        <MiniStat label="Families" value="420" />
        <MiniStat label="Running" value="6 yrs" />
      </View>
      <Text style={styles.paragraph}>This project reduces emissions through locally managed action and issues verified credits after impact checks.</Text>
      <PrimaryButton label="Select This Project" onPress={goNext} />
    </ScreenIntro>
  );
}

function Purchase({ goNext }) {
  return (
    <ScreenIntro title="Purchase credits" text="We matched credits to your estimated yearly footprint." icon="cart-outline">
      <PriceRow label="Credits needed" value="8.4 tons" />
      <PriceRow label="Rate" value="₹820 / ton" />
      <PriceRow label="Platform fee" value="₹299" />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>₹7,187</Text>
      </View>
      <TrustNote text="Secure payment. Certificate issued within 24 hours." />
      <PrimaryButton label="Proceed to Payment" onPress={goNext} />
    </ScreenIntro>
  );
}

function Payment({ payment, setPayment, goNext }) {
  return (
    <ScreenIntro title="Pay securely" text="UPI is selected by default for fast checkout." icon="shield-checkmark-outline">
      <Text style={styles.label}>UPI app</Text>
      <ChipRow values={['GPay', 'PhonePe', 'Paytm']} selected={payment} onSelect={setPayment} />
      <Field label="UPI ID" value="freshleaf@okaxis" />
      <TrustNote text="256-bit encrypted. Powered by Razorpay." />
      <PrimaryButton label="Pay ₹7,187" onPress={goNext} />
    </ScreenIntro>
  );
}

function Success({ goTo }) {
  return (
    <ScreenIntro title="You are carbon neutral" text="Your certificate is ready to share with customers." icon="checkmark-circle-outline">
      <View style={styles.certificate}>
        <Text style={styles.certSmall}>GREENMARK CERTIFICATE</Text>
        <Text style={styles.certTitle}>Fresh Leaf Cafe</Text>
        <Text style={styles.certText}>has offset 8.4 tons CO2e through verified climate credits.</Text>
        <Text style={styles.certId}>ID GM-IN-2026-0842</Text>
      </View>
      <PrimaryButton label="Share Certificate" onPress={() => goTo('Dashboard')} icon="share-social-outline" />
      <SecondaryButton label="Download" onPress={() => {}} icon="download-outline" />
      <SecondaryButton label="Go to Dashboard" onPress={() => goTo('Dashboard')} />
    </ScreenIntro>
  );
}

function Dashboard() {
  return (
    <ScreenIntro title="Good morning, Fresh Leaf" text="Your climate proof is active and ready for customers." icon="home-outline">
      <View style={styles.statsGrid}>
        <MiniStat label="Trees equivalent" value="386" />
        <MiniStat label="Energy saved" value="9.2 MWh" />
        <MiniStat label="Families helped" value="42" />
      </View>
      <SectionTitle title="Recent activity" />
      <Activity text="Certificate shared on WhatsApp" time="Today" />
      <Activity text="8.4 credits purchased" time="Yesterday" />
      <SectionTitle title="Quick actions" />
      <View style={styles.quickGrid}>
        <ActionTile icon="qr-code-outline" title="Show badge" subtitle="Display at billing counter" compact />
        <ActionTile icon="document-text-outline" title="View report" subtitle="Monthly footprint summary" compact />
      </View>
    </ScreenIntro>
  );
}

function Learn() {
  return (
    <ScreenIntro title="Learn" text="Short explainers for busy business owners." icon="book-outline">
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color={colors.muted} />
        <Text style={styles.searchText}>Search guides</Text>
      </View>
      <ChipRow values={['Basics', 'Carbon credits', 'Policy']} selected="Basics" onSelect={() => {}} />
      {articles.map(([tag, title]) => (
        <View style={styles.articleCard} key={title}>
          <Text style={styles.badge}>{tag}</Text>
          <Text style={styles.articleTitle}>{title}</Text>
          <Text style={styles.articleText}>A 3-minute read with practical examples for Indian cafes and kitchens.</Text>
        </View>
      ))}
    </ScreenIntro>
  );
}

function Profile() {
  return (
    <ScreenIntro title="Account" text="Manage business details, certificates, and payment settings." icon="person-circle-outline">
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>FL</Text></View>
        <View>
          <Text style={styles.profileName}>Fresh Leaf Cafe</Text>
          <Text style={styles.profileMeta}>Bengaluru • Cafe • Carbon neutral</Text>
        </View>
      </View>
      <View style={styles.statsGrid}>
        <MiniStat label="Credits" value="8.4" />
        <MiniStat label="Certificates" value="1" />
        <MiniStat label="Badge views" value="214" />
      </View>
      {['Payment methods', 'Certificates', 'Settings', 'Logout'].map((item) => (
        <TouchableOpacity style={styles.optionRow} key={item} activeOpacity={0.75}>
          <Text style={styles.optionText}>{item}</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </TouchableOpacity>
      ))}
    </ScreenIntro>
  );
}

function ScreenIntro({ title, text, icon, community, children }) {
  const IconSet = community ? MaterialCommunityIcons : Ionicons;
  return (
    <View>
      <View style={styles.headerIcon}>
        <IconSet name={icon} size={28} color={colors.tealDark} />
      </View>
      <Text style={styles.h2}>{title}</Text>
      <Text style={styles.body}>{text}</Text>
      <View style={styles.stack}>{children}</View>
    </View>
  );
}

function PrimaryButton({ label, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress} activeOpacity={0.78}>
      {icon && <Ionicons name={icon} size={20} color={colors.white} />}
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({ label, onPress, icon }) {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={onPress} activeOpacity={0.78}>
      {icon && <Ionicons name={icon} size={20} color={colors.tealDark} />}
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function Field({ label, value, helper, secure, keyboardType }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        defaultValue={value}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        placeholderTextColor={colors.muted}
      />
      {helper && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

function ChipRow({ values, selected, onSelect }) {
  return (
    <View style={styles.chipRow}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          style={[styles.chip, selected === value && styles.chipActive]}
          onPress={() => onSelect(value)}
          activeOpacity={0.75}
        >
          <Text style={[styles.chipText, selected === value && styles.chipTextActive]}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Stepper({ label, value, setValue, min = 0 }) {
  return (
    <View style={styles.stepperWrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepButton} onPress={() => setValue(Math.max(min, value - 1))}>
          <Ionicons name="remove" size={22} color={colors.tealDark} />
        </TouchableOpacity>
        <Text style={styles.stepValue}>{value}</Text>
        <TouchableOpacity style={styles.stepButton} onPress={() => setValue(value + 1)}>
          <Ionicons name="add" size={22} color={colors.tealDark} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Toggle({ label, value, setValue }) {
  return (
    <TouchableOpacity style={styles.toggleRow} onPress={() => setValue(!value)} activeOpacity={0.75}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={[styles.toggle, value && styles.toggleActive]}>
        <View style={[styles.toggleKnob, value && styles.toggleKnobActive]} />
      </View>
    </TouchableOpacity>
  );
}

function ActionTile({ icon, title, subtitle, compact }) {
  return (
    <TouchableOpacity style={[styles.actionTile, compact && styles.actionTileCompact]} activeOpacity={0.75}>
      <View style={styles.tileIcon}>
        <Ionicons name={icon} size={22} color={colors.tealDark} />
      </View>
      <View style={styles.tileCopy}>
        <Text style={styles.tileTitle}>{title}</Text>
        <Text style={styles.tileSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ProjectCard({ project, onPress }) {
  return (
    <TouchableOpacity style={styles.projectCard} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.projectImage, { backgroundColor: project.color }]}>
        <MaterialCommunityIcons name={project.icon} size={36} color={colors.tealDark} />
      </View>
      <View style={styles.projectCopy}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>Verified by Verra</Text>
        </View>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectMeta}>{project.location} • {project.price}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.muted} />
    </TouchableOpacity>
  );
}

function TrustNote({ text }) {
  return (
    <View style={styles.trustNote}>
      <Ionicons name="lock-closed-outline" size={18} color={colors.tealDark} />
      <Text style={styles.trustText}>{text}</Text>
    </View>
  );
}

function MiniStat({ label, value }) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniValue}>{value}</Text>
      <Text style={styles.miniLabel}>{label}</Text>
    </View>
  );
}

function PriceRow({ label, value }) {
  return (
    <View style={styles.priceRow}>
      <Text style={styles.priceLabel}>{label}</Text>
      <Text style={styles.priceValue}>{value}</Text>
    </View>
  );
}

function SectionTitle({ title }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Activity({ text, time }) {
  return (
    <View style={styles.activity}>
      <View style={styles.activityDot} />
      <Text style={styles.activityText}>{text}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  );
}

function Divider() {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

function BottomNav({ active, goTo }) {
  const items = [
    ['Dashboard', 'Home', 'home-outline'],
    ['Marketplace', 'Offset', 'leaf-outline'],
    ['Dashboard', 'Impact', 'bar-chart-outline'],
    ['Success', 'Proof', 'ribbon-outline'],
    ['Profile', 'Account', 'person-outline']
  ];
  return (
    <View style={styles.bottomNav}>
      {items.map(([target, label, icon]) => {
        const isActive = active === target || (label === 'Impact' && active === 'Dashboard');
        return (
          <TouchableOpacity key={label} style={styles.navItem} onPress={() => goTo(target)} activeOpacity={0.75}>
            <Ionicons name={icon} size={22} color={isActive ? colors.green : colors.muted} />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.surface
  },
  content: {
    padding: 20,
    paddingBottom: 28
  },
  withNav: {
    paddingBottom: 112
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.surface
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line
  },
  topTitleWrap: {
    flex: 1
  },
  topTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 8
  },
  progressTrack: {
    height: 5,
    backgroundColor: colors.line,
    borderRadius: 99,
    overflow: 'hidden'
  },
  progressFill: {
    height: 5,
    backgroundColor: colors.green,
    borderRadius: 99
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  logoMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.tealDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.tealDark
  },
  heroScreen: {
    minHeight: 760,
    justifyContent: 'space-between'
  },
  illustration: {
    height: 330,
    marginVertical: 28,
    backgroundColor: colors.tealLight,
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 38
  },
  sun: {
    position: 'absolute',
    top: 34,
    right: 42,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.marigold
  },
  shop: {
    width: 210,
    height: 160,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    paddingTop: 44
  },
  awning: {
    position: 'absolute',
    top: 0,
    width: 230,
    height: 34,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: colors.green
  },
  shopText: {
    color: colors.tealDark,
    fontSize: 20,
    fontWeight: '900'
  },
  shopWindows: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24
  },
  window: {
    width: 48,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.tealLight
  },
  treeLeft: {
    position: 'absolute',
    left: 32,
    bottom: 34,
    width: 52,
    height: 72,
    borderRadius: 28,
    backgroundColor: '#9FE3C8'
  },
  treeRight: {
    position: 'absolute',
    right: 28,
    bottom: 40,
    width: 46,
    height: 62,
    borderRadius: 24,
    backgroundColor: '#8ADCBF'
  },
  bottomHero: {
    gap: 14
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  h1: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    color: colors.ink
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 8
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
    marginBottom: 8
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.muted,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line
  },
  stack: {
    marginTop: 24,
    gap: 16
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: colors.green,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900'
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8
  },
  secondaryButtonText: {
    color: colors.tealDark,
    fontSize: 16,
    fontWeight: '800'
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.ink,
    marginBottom: 8
  },
  input: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    color: colors.ink,
    fontSize: 15,
    fontWeight: '600'
  },
  helper: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  linkText: {
    alignSelf: 'flex-end',
    color: colors.tealDark,
    fontSize: 14,
    fontWeight: '800'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.line
  },
  dividerText: {
    color: colors.muted,
    fontWeight: '700'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  choiceCard: {
    width: '47%',
    minHeight: 118,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    justifyContent: 'space-between'
  },
  choiceCardActive: {
    backgroundColor: colors.green,
    borderColor: colors.green
  },
  choiceText: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.ink
  },
  choiceTextActive: {
    color: colors.white
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  chip: {
    minHeight: 42,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chipActive: {
    backgroundColor: colors.tealDark,
    borderColor: colors.tealDark
  },
  chipText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800'
  },
  chipTextActive: {
    color: colors.white
  },
  stepperWrap: {
    gap: 8
  },
  stepper: {
    height: 62,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12
  },
  stepButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.ink
  },
  toggleRow: {
    minHeight: 62,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toggleLabel: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800'
  },
  toggle: {
    width: 54,
    height: 32,
    borderRadius: 99,
    backgroundColor: colors.line,
    padding: 3
  },
  toggleActive: {
    backgroundColor: colors.green
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white
  },
  toggleKnobActive: {
    transform: [{ translateX: 22 }]
  },
  actionTile: {
    minHeight: 78,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  actionTileCompact: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  tileIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tileCopy: {
    flex: 1
  },
  tileTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.ink
  },
  tileSubtitle: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted
  },
  trustNote: {
    minHeight: 48,
    borderRadius: 15,
    backgroundColor: colors.tealLight,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  trustText: {
    color: colors.tealDark,
    fontWeight: '800',
    flex: 1,
    fontSize: 12
  },
  resultCard: {
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 24,
    alignItems: 'center'
  },
  bigNumber: {
    fontSize: 72,
    lineHeight: 78,
    fontWeight: '900',
    color: colors.tealDark
  },
  tons: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.ink
  },
  gauge: {
    width: '100%',
    height: 12,
    borderRadius: 99,
    marginVertical: 22,
    backgroundColor: colors.line,
    overflow: 'hidden'
  },
  gaugeFill: {
    width: '58%',
    height: 12,
    borderRadius: 99,
    backgroundColor: colors.marigold
  },
  comparison: {
    color: colors.tealDark,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center'
  },
  searchBox: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10
  },
  searchText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700'
  },
  projectCard: {
    minHeight: 118,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  projectImage: {
    width: 78,
    height: 86,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  projectCopy: {
    flex: 1
  },
  badgeRow: {
    flexDirection: 'row'
  },
  badge: {
    alignSelf: 'flex-start',
    color: colors.tealDark,
    backgroundColor: colors.tealLight,
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 9,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '900'
  },
  projectTitle: {
    marginTop: 8,
    color: colors.ink,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '900'
  },
  projectMeta: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700'
  },
  projectHero: {
    height: 190,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10
  },
  miniStat: {
    flex: 1,
    minHeight: 86,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 12,
    justifyContent: 'center'
  },
  miniValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.tealDark
  },
  miniLabel: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 15,
    color: colors.muted,
    fontWeight: '700'
  },
  priceRow: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priceLabel: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700'
  },
  priceValue: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900'
  },
  totalRow: {
    minHeight: 68,
    borderRadius: 18,
    backgroundColor: colors.tealDark,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800'
  },
  totalValue: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900'
  },
  certificate: {
    minHeight: 240,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.green,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  certSmall: {
    color: colors.tealDark,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1
  },
  certTitle: {
    marginTop: 16,
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center'
  },
  certText: {
    marginTop: 10,
    color: colors.muted,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21
  },
  certId: {
    marginTop: 18,
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: '900'
  },
  sectionTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '900',
    color: colors.ink
  },
  activity: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  activityDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.green
  },
  activityText: {
    flex: 1,
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800'
  },
  activityTime: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700'
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 12
  },
  articleCard: {
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16
  },
  articleTitle: {
    marginTop: 12,
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900'
  },
  articleText: {
    marginTop: 6,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  },
  profileCard: {
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.tealDark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900'
  },
  profileName: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900'
  },
  profileMeta: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700'
  },
  optionRow: {
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800'
  },
  bottomNav: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 12,
    height: 72,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  navLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '800'
  },
  navLabelActive: {
    color: colors.green
  }
});
