import React from 'react'
import { Select } from '@chakra-ui/react'

const CountryPhoneList = ({value, onSelect}) => {
    // console.log(value)
    const handleChange = (e) => {
        onSelect(e.target.value)
    }

  return (
    <>
        <Select 
        height={"35px"} 
        fontSize="15px" 
        color="acsys.iconColor" 
        mb="3" 
        value={value}
        // placeholder="Seleccione un pais"
        // class="input-block-level" 
        // id="countryCode" 
        // name="countryCode"
        maxWidth="330px"
        onChange={handleChange}
        >
            <option value="" disabled hidden>Seleccione un pais</option>
            <option data-country-code="AF" value="93">&#x1F1E6;&#x1F1EB; Afghanistan (+93)</option>
            <option data-country-code="AL" value="355">&#x1F1E6;&#x1F1FD; Albania (+355)</option>
            <option data-country-code="DZ" value="213">&#x1F1E9;&#x1F1FF; Algeria (+213)</option>
            <option data-country-code="AD" value="376">&#x1F1E6;&#x1F1E9; Andorra (+376)</option>
            <option data-country-code="AO" value="244">&#x1F1E6;&#x1F1F4; Angola (+244)</option>
            <option data-country-code="AI" value="1264">&#x1F1E6;&#x1F1EE; Anguilla (+1264)</option>
            <option data-country-code="AG" value="1268">&#x1F1E6;&#x1F1EC; Antigua &amp; Barbuda (+1268)</option>
            <option data-country-code="AR" value="54">&#x1F1E6;&#x1F1F7; Argentina (+54)</option>
            <option data-country-code="AM" value="374">&#x1F1E6;&#x1F1F2; Armenia (+374)</option>
            <option data-country-code="AW" value="297">&#x1F1E6;&#x1F1FC;Aruba (+297)</option>
            <option data-country-code="AC" value="247">&#x1F1E6;&#x1F1E8; Ascension Island (+247)</option>
            <option data-country-code="AU" value="61">&#x1F1E6;&#x1F1FA; Australia (+61)</option>
            <option data-country-code="AT" value="43">&#x1F1E6;&#x1F1F9; Austria (+43)</option>
            <option data-country-code="AZ" value="994">&#x1F1E6;&#x1F1FF; Azerbaijan (+994)</option>
            <option data-country-code="BS" value="1242">&#x1F1E7;&#x1F1F8; Bahamas (+1242)</option>
            <option data-country-code="BH" value="973">&#x1F1E7;&#x1F1ED; Bahrain (+973)</option>
            <option data-country-code="BD" value="880">&#x1F1E7;&#x1F1E9; Bangladesh (+880)</option>
            <option data-country-code="BB" value="1246">&#x1F1E7;&#x1F1E7; Barbados (+1246)</option>
            <option data-country-code="BY" value="375">&#x1F1E7;&#x1F1FE; Belarus (+375)</option>
            <option data-country-code="BE" value="32">&#x1F1E7;&#x1F1EA; Belgium (+32)</option>
            <option data-country-code="BZ" value="501">&#x1F1E7;&#x1F1FF; Belize (+501)</option>
            <option data-country-code="BJ" value="229">&#x1F1E7;&#x1F1EF; Benin (+229)</option>
            <option data-country-code="BM" value="1441">&#x1F1E7;&#x1F1F2; Bermuda (+1441)</option>
            <option data-country-code="BT" value="975">&#x1F1E7;&#x1F1F9; Bhutan (+975)</option>
            <option data-country-code="BO" value="591">&#x1F1E7;&#x1F1F4; Bolivia (+591)</option>
            <option data-country-code="BQ" value="599">&#x1F1E7;&#x1F1F6; Bonaire, Saba and Sint Eustatius (+599)</option>
            <option data-country-code="BA" value="387">&#x1F1E7;&#x1F1E6; Bosnia Herzegovina (+387)</option>
            <option data-country-code="BW" value="267">&#x1F1E7;&#x1F1FC; Botswana (+267)</option>
            <option data-country-code="BR" value="55">&#x1F1E7;&#x1F1F7; Brazil (+55)</option>
            <option data-country-code="IO" value="246">&#x1F1EE;&#x1F1F4; British Indian Ocean Territory (+246)</option>
            <option data-country-code="BN" value="673">&#x1F1E7;&#x1F1F3; Brunei (+673)</option>
            <option data-country-code="BG" value="359">&#x1F1E7;&#x1F1EC; Bulgaria (+359)</option>
            <option data-country-code="BF" value="226">&#x1F1E7;&#x1F1EB; Burkina Faso (+226)</option>
            <option data-country-code="BI" value="257">&#x1F1E7;&#x1F1EE; Burundi (+257)</option>
            <option data-country-code="KH" value="855">&#x1F1F0;&#x1F1ED; Cambodia (+855)</option>
            <option data-country-code="CM" value="237">&#x1F1E8;&#x1F1F2; Cameroon (+237)</option>
            <option data-country-code="CA" value="1">&#x1F1E8;&#x1F1E6; Canada (+1)</option>
            <option data-country-code="CV" value="238">&#x1F1E8;&#x1F1FB; Cape Verde Islands (+238)</option>
            <option data-country-code="KY" value="1345">&#x1F1F0;&#x1F1FE; Cayman Islands (+1345)</option>
            <option data-country-code="CF" value="236">&#x1F1E8;&#x1F1EB; Central African Republic (+236)</option>
            <option data-country-code="TD" value="235">&#x1F1F9;&#x1F1E9; Chad (+235)</option>
            <option data-country-code="CL" value="56">&#x1F1E8;&#x1F1F1; Chile (+56)</option>
            <option data-country-code="CN" value="86">&#x1F1E8;&#x1F1F3; China (+86)</option>
            <option data-country-code="CO" value="57">&#x1F1E8;&#x1F1F4; Colombia (+57)</option>
            <option data-country-code="KM" value="269">&#x1F1F0;&#x1F1F2; Comoros (+269)</option>
            <option data-country-code="CG" value="242">&#x1F1E8;&#x1F1EC; Congo (+242)</option>
            <option data-country-code="CD" value="243">&#x1F1E8;&#x1F1E9; Congo, Democratic Republic of the (+243)</option>
            <option data-country-code="CK" value="682">&#x1F1E8;&#x1F1F0; Cook Islands (+682)</option>
            <option data-country-code="CR" value="506">&#x1F1E8;&#x1F1F7; Costa Rica (+506)</option>
            <option data-country-code="HR" value="385">&#x1F1ED;&#x1F1F7; Croatia (+385)</option>
            <option data-country-code="CU" value="53">&#x1F1E8;&#x1F1FA; Cuba (+53)</option>
            <option data-country-code="CW" value="5999">&#x1F1E8;&#x1F1FC; Curaçao (+5999)</option>
            <option data-country-code="CY" value="357">&#x1F1E8;&#x1F1FE; Cyprus (+357)</option>
            <option data-country-code="CZ" value="420">&#x1F1E8;&#x1F1FF; Czech Republic (+420)</option>
            <option data-country-code="DK" value="45">&#x1F1E9;&#x1F1F0; Denmark (+45)</option>
            <option data-country-code="DJ" value="253">&#x1F1E9;&#x1F1EF; Djibouti (+253)</option>
            <option data-country-code="DM" value="1767">&#x1F1E9;&#x1F1F2; Dominica (+1767)</option>
            <option data-country-code="DO" value="1809">&#x1F1E9;&#x1F1F4; Dominican Republic (+1809)</option>
            <option data-country-code="TL" value="670">&#x1F1F9;&#x1F1F1; East Timor (+670)</option>
            <option data-country-code="EC" value="593">&#x1F1EA;&#x1F1E8; Ecuador (+593)</option>
            <option data-country-code="EG" value="20">&#x1F1EA;&#x1F1EC; Egypt (+20)</option>
            <option data-country-code="SV" value="503">&#x1F1F8;&#x1F1FB; El Salvador (+503)</option>
            <option data-country-code="GQ" value="240">&#x1F1EC;&#x1F1F6; Equatorial Guinea (+240)</option>
            <option data-country-code="ER" value="291">&#x1F1EA;&#x1F1F7; Eritrea (+291)</option>
            <option data-country-code="EE" value="372">&#x1F1EA;&#x1F1EA; Estonia (+372)</option>
            <option data-country-code="SZ" value="268">&#x1F1F8;&#x1F1FF; Eswatini (+268)</option>
            <option data-country-code="ET" value="251">&#x1F1EA;&#x1F1F9; Ethiopia (+251)</option>
            <option data-country-code="FK" value="500">&#x1F1EB;&#x1F1F0; Falkland Islands (+500)</option>
            <option data-country-code="FO" value="298">&#x1F1EB;&#x1F1F4; Faroe Islands (+298)</option>
            <option data-country-code="FJ" value="679">&#x1F1EB;&#x1F1EF; Fiji (+679)</option>
            <option data-country-code="FI" value="358">&#x1F1EB;&#x1F1EE; Finland (+358)</option>
            <option data-country-code="FR" value="33">&#x1F1EB;&#x1F1F7; France (+33)</option>
            <option data-country-code="GF" value="594">&#x1F1EC;&#x1F1EB; French Guiana (+594)</option>
            <option data-country-code="PF" value="689">&#x1F1F5;&#x1F1EB; French Polynesia (+689)</option>
            <option data-country-code="GA" value="241">&#x1F1EC;&#x1F1E6; Gabon (+241)</option>
            <option data-country-code="GM" value="220">&#x1F1EC;&#x1F1F2; Gambia (+220)</option>
            <option data-country-code="GE" value="995">&#x1F1EC;&#x1F1EA; Georgia (+995)</option>
            <option data-country-code="DE" value="49">&#x1F1E9;&#x1F1EA; Germany (+49)</option>
            <option data-country-code="GH" value="233">&#x1F1EC;&#x1F1ED; Ghana (+233)</option>
            <option data-country-code="GI" value="350">&#x1F1EC;&#x1F1EE; Gibraltar (+350)</option>
            <option data-country-code="GR" value="30">&#x1F1EC;&#x1F1F7; Greece (+30)</option>
            <option data-country-code="GL" value="299">&#x1F1EC;&#x1F1F1; Greenland (+299)</option>
            <option data-country-code="GD" value="1473">&#x1F1EC;&#x1F1E9; Grenada (+1473)</option>
            <option data-country-code="GP" value="590">&#x1F1EC;&#x1F1F5; Guadeloupe (+590)</option>
            <option data-country-code="GU" value="1671">&#x1F1EC;&#x1F1FA; Guam (+1671)</option>
            <option data-country-code="GT" value="502">&#x1F1EC;&#x1F1F9; Guatemala (+502)</option>
            <option data-country-code="GN" value="224">&#x1F1EC;&#x1F1F3; Guinea (+224)</option>
            <option data-country-code="GW" value="245">&#x1F1EC;&#x1F1FC; Guinea - Bissau (+245)</option>
            <option data-country-code="GY" value="592">&#x1F1EC;&#x1F1FE; Guyana (+592)</option>
            <option data-country-code="HT" value="509">&#x1F1ED;&#x1F1F9; Haiti (+509)</option>
            <option data-country-code="HN" value="504">&#x1F1ED;&#x1F1F3; Honduras (+504)</option>
            <option data-country-code="HK" value="852">&#x1F1ED;&#x1F1F0; Hong Kong (+852)</option>
            <option data-country-code="HU" value="36">&#x1F1ED;&#x1F1FA; Hungary (+36)</option>
            <option data-country-code="IS" value="354">&#x1F1EE;&#x1F1F8; Iceland (+354)</option>
            <option data-country-code="IN" value="91">&#x1F1EE;&#x1F1F3; India (+91)</option>
            <option data-country-code="ID" value="62">&#x1F1EE;&#x1F1E9; Indonesia (+62)</option>
            <option data-country-code="IR" value="98">&#x1F1EE;&#x1F1F7; Iran (+98)</option>
            <option data-country-code="IQ" value="964">&#x1F1EE;&#x1F1F6; Iraq (+964)</option>
            <option data-country-code="IE" value="353">&#x1F1EE;&#x1F1EA; Ireland (+353)</option>
            <option data-country-code="IL" value="972">&#x1F1EE;&#x1F1F1; Israel (+972)</option>
            <option data-country-code="IT" value="39">&#x1F1EE;&#x1F1F9; Italy (+39)</option>
            <option data-country-code="CI" value="225">&#x1F1E8;&#x1F1EE; Ivory Coast (+225)</option>
            <option data-country-code="JM" value="1876">&#x1F1EF;&#x1F1F2; Jamaica (+1876)</option>
            <option data-country-code="JP" value="81">&#x1F1EF;&#x1F1F5; Japan (+81)</option>
            <option data-country-code="JO" value="962">&#x1F1EF;&#x1F1F4; Jordan (+962)</option>
            <option data-country-code="KZ" value="7">&#x1F1F0;&#x1F1FF; Kazakhstan (+7)</option>
            <option data-country-code="KE" value="254">&#x1F1F0;&#x1F1EA; Kenya (+254)</option>
            <option data-country-code="KI" value="686">&#x1F1F0;&#x1F1EE; Kiribati (+686)</option>
            <option data-country-code="KP" value="850">&#x1F1F0;&#x1F1F5; Korea, North (+850)</option>
            <option data-country-code="KR" value="82">&#x1F1F0;&#x1F1F7; Korea, South (+82)</option>
            <option data-country-code="XK" value="383">&#x1F1FD;&#x1F1F0; Kosovo (+383)</option>
            <option data-country-code="KW" value="965">&#x1F1F0;&#x1F1FC; Kuwait (+965)</option>
            <option data-country-code="KG" value="996">&#x1F1F0;&#x1F1EC; Kyrgyzstan (+996)</option>
            <option data-country-code="LA" value="856">&#x1F1F1;&#x1F1E6; Laos (+856)</option>
            <option data-country-code="LV" value="371">&#x1F1F1;&#x1F1FB; Latvia (+371)</option>
            <option data-country-code="LB" value="961">&#x1F1F1;&#x1F1E7; Lebanon (+961)</option>
            <option data-country-code="LS" value="266">&#x1F1F1;&#x1F1F8; Lesotho (+266)</option>
            <option data-country-code="LR" value="231">&#x1F1F1;&#x1F1F7; Liberia (+231)</option>
            <option data-country-code="LY" value="218">&#x1F1F1;&#x1F1FE; Libya (+218)</option>
            <option data-country-code="LI" value="423">&#x1F1F1;&#x1F1EE; Liechtenstein (+423)</option>
            <option data-country-code="LT" value="370">&#x1F1F1;&#x1F1F9; Lithuania (+370)</option>
            <option data-country-code="LU" value="352">&#x1F1F1;&#x1F1FA; Luxembourg (+352)</option>
            <option data-country-code="MO" value="853">&#x1F1F2;&#x1F1F4; Macao (+853)</option>
            <option data-country-code="MK" value="389">&#x1F1F2;&#x1F1F0; Macedonia (+389)</option>
            <option data-country-code="MG" value="261">&#x1F1F2;&#x1F1EC; Madagascar (+261)</option>
            <option data-country-code="MW" value="265">&#x1F1F2;&#x1F1FC; Malawi (+265)</option>
            <option data-country-code="MY" value="60">&#x1F1F2;&#x1F1FE; Malaysia (+60)</option>
            <option data-country-code="MV" value="960">&#x1F1F2;&#x1F1FB; Maldives (+960)</option>
            <option data-country-code="ML" value="223">&#x1F1F2;&#x1F1F1; Mali (+223)</option>
            <option data-country-code="MT" value="356">&#x1F1F2;&#x1F1F9; Malta (+356)</option>
            <option data-country-code="MH" value="692">&#x1F1F2;&#x1F1ED; Marshall Islands (+692)</option>
            <option data-country-code="MQ" value="596">&#x1F1F2;&#x1F1F6; Martinique (+596)</option>
            <option data-country-code="MR" value="222">&#x1F1F2;&#x1F1F7; Mauritania (+222)</option>
            <option data-country-code="MU" value="230">&#x1F1F2;&#x1F1FA; Mauritius (+230)</option>
            <option data-country-code="YT" value="262">&#x1F1FE;&#x1F1F9; Mayotte (+262)</option>
            <option data-country-code="MX" value="52">&#x1F1F2;&#x1F1FD; Mexico (+52)</option>
            <option data-country-code="FM" value="691">&#x1F1EB;&#x1F1F2; Micronesia (+691)</option>
            <option data-country-code="MD" value="373">&#x1F1F2;&#x1F1E9; Moldova (+373)</option>
            <option data-country-code="MC" value="377">&#x1F1F2;&#x1F1E8; Monaco (+377)</option>
            <option data-country-code="MN" value="976">&#x1F1F2;&#x1F1F3; Mongolia (+976)</option>
            <option data-country-code="ME" value="382">&#x1F1F2;&#x1F1EA; Montenegro (+382)</option>
            <option data-country-code="MS" value="1664">&#x1F1F2;&#x1F1F8; Montserrat (+1664)</option>
            <option data-country-code="MA" value="212">&#x1F1F2;&#x1F1E6; Morocco (+212)</option>
            <option data-country-code="MZ" value="258">&#x1F1F2;&#x1F1FF; Mozambique (+258)</option>
            <option data-country-code="MN" value="95">&#x1F1F2;&#x1F1F2; Myanmar (+95)</option>
            <option data-country-code="NA" value="264">&#x1F1F3;&#x1F1E6; Namibia (+264)</option>
            <option data-country-code="NR" value="674">&#x1F1F3;&#x1F1F7; Nauru (+674)</option>
            <option data-country-code="NP" value="977">&#x1F1F3;&#x1F1F5; Nepal (+977)</option>
            <option data-country-code="NL" value="31">&#x1F1F3;&#x1F1F1; Netherlands (+31)</option>
            <option data-country-code="NC" value="687">&#x1F1F3;&#x1F1E8; New Caledonia (+687)</option>
            <option data-country-code="NZ" value="64">&#x1F1F3;&#x1F1FF; New Zealand (+64)</option>
            <option data-country-code="NI" value="505">&#x1F1F3;&#x1F1EE; Nicaragua (+505)</option>
            <option data-country-code="NE" value="227">&#x1F1F3;&#x1F1EA; Niger (+227)</option>
            <option data-country-code="NG" value="234">&#x1F1F3;&#x1F1EC; Nigeria (+234)</option>
            <option data-country-code="NU" value="683">&#x1F1F3;&#x1F1FA; Niue (+683)</option>
            <option data-country-code="NF" value="672">&#x1F1F3;&#x1F1EB; Norfolk Islands (+672)</option>
            <option data-country-code="NP" value="1670">&#x1F1F2;&#x1F1F5; Northern Mariana Islands (+1670)</option>
            <option data-country-code="NO" value="47">&#x1F1F3;&#x1F1F4; Norway (+47)</option>
            <option data-country-code="OM" value="968">&#x1F1F4;&#x1F1F2; Oman (+968)</option>
            <option data-country-code="PK" value="92">&#x1F1F5;&#x1F1F0; Pakistan (+92)</option>
            <option data-country-code="PW" value="680">&#x1F1F5;&#x1F1FC; Palau (+680)</option>
            <option data-country-code="PS" value="970">&#x1F1F5;&#x1F1F8; Palestine (+970)</option>
            <option data-country-code="PA" value="507">&#x1F1F5;&#x1F1E6; Panama (+507)</option>
            <option data-country-code="PG" value="675">&#x1F1F5;&#x1F1EC; Papua New Guinea (+675)</option>
            <option data-country-code="PY" value="595">&#x1F1F5;&#x1F1FE; Paraguay (+595)</option>
            <option data-country-code="PE" value="51">&#x1F1F5;&#x1F1EA; Peru (+51)</option>
            <option data-country-code="PH" value="63">&#x1F1F5;&#x1F1ED; Philippines (+63)</option>
            <option data-country-code="PL" value="48">&#x1F1F5;&#x1F1F1; Poland (+48)</option>
            <option data-country-code="PT" value="351">&#x1F1F5;&#x1F1F9; Portugal (+351)</option>
            <option data-country-code="PR" value="1787">&#x1F1F5;&#x1F1F7; Puerto Rico (+1787)</option>
            <option data-country-code="QA" value="974">&#x1F1F6;&#x1F1E6; Qatar (+974)</option>
            <option data-country-code="RE" value="262">&#x1F1F7;&#x1F1EA; Réunion (+262)</option>
            <option data-country-code="RO" value="40">&#x1F1F7;&#x1F1F4; Romania (+40)</option>
            <option data-country-code="RU" value="7">&#x1F1F7;&#x1F1FA; Russia (+7)</option>
            <option data-country-code="RW" value="250">&#x1F1F7;&#x1F1FC; Rwanda (+250)</option>
            <option data-country-code="WS" value="685">&#x1F1FC;&#x1F1F8; Samoa (+685)</option>
            <option data-country-code="SM" value="378">&#x1F1F8;&#x1F1F2; San Marino (+378)</option>
            <option data-country-code="ST" value="239">&#x1F1F8;&#x1F1F9; São Tomé &amp; Principe (+239)</option>
            <option data-country-code="SA" value="966">&#x1F1F8;&#x1F1E6; Saudi Arabia (+966)</option>
            <option data-country-code="SN" value="221">&#x1F1F8;&#x1F1F3; Senegal (+221)</option>
            <option data-country-code="CS" value="381">&#x1F1F7;&#x1F1F8; Serbia (+381)</option>
            <option data-country-code="SC" value="248">&#x1F1F8;&#x1F1E8; Seychelles (+248)</option>
            <option data-country-code="SL" value="232">&#x1F1F8;&#x1F1F1; Sierra Leone (+232)</option>
            <option data-country-code="SG" value="65">&#x1F1F8;&#x1F1EC; Singapore (+65)</option>
            <option data-country-code="SK" value="421">&#x1F1F8;&#x1F1F0; Slovakia (+421)</option>
            <option data-country-code="SI" value="386">&#x1F1F8;&#x1F1EE; Slovenia (+386)</option>
            <option data-country-code="SB" value="677">&#x1F1F8;&#x1F1E7; Solomon Islands (+677)</option>
            <option data-country-code="SO" value="252">&#x1F1F8;&#x1F1F4; Somalia (+252)</option>
            <option data-country-code="ZA" value="27">&#x1F1FF;&#x1F1E6; South Africa (+27)</option>
            <option data-country-code="SS" value="211">&#x1F1F8;&#x1F1F8; South Sudan (+211)</option>
            <option data-country-code="ES" value="34">&#x1F1EA;&#x1F1F8; Spain (+34)</option>
            <option data-country-code="LK" value="94">&#x1F1F1;&#x1F1F0; Sri Lanka (+94)</option>
            <option data-country-code="SH" value="290">&#x1F1F8;&#x1F1ED; St. Helena (+290)</option>
            <option data-country-code="KN" value="1869">&#x1F1F0;&#x1F1F3; St. Kitts and Nevis (+1869)</option>
            <option data-country-code="SC" value="1758">&#x1F1F1;&#x1F1E8; St. Lucia (+1758)</option>
            <option data-country-code="PM" value="508">&#x1F1F5;&#x1F1F2; St. Pierre and Miquelon (+508)</option>
            <option data-country-code="SD" value="249">&#x1F1F8;&#x1F1E9; Sudan (+249)</option>
            <option data-country-code="SR" value="597">&#x1F1F8;&#x1F1F7; Suriname (+597)</option>
            <option data-country-code="SE" value="46">&#x1F1F8;&#x1F1EA; Sweden (+46)</option>
            <option data-country-code="CH" value="41">&#x1F1E8;&#x1F1ED; Switzerland (+41)</option>
            <option data-country-code="SI" value="963">&#x1F1F8;&#x1F1FE; Syria (+963)</option>
            <option data-country-code="TW" value="886">&#x1F1F9;&#x1F1FC; Taiwan (+886)</option>
            <option data-country-code="TJ" value="992">&#x1F1F9;&#x1F1EF; Tajikstan (+992)</option>
            <option data-country-code="TZ" value="255">&#x1F1F9;&#x1F1FF; Tanzania (+255)</option>
            <option data-country-code="TH" value="66">&#x1F1F9;&#x1F1ED; Thailand (+66)</option>
            <option data-country-code="TG" value="228">&#x1F1F9;&#x1F1EC; Togo (+228)</option>
            <option data-country-code="TK" value="690">&#x1F1F9;&#x1F1F0; Tokelau (+690)</option>
            <option data-country-code="TO" value="676">&#x1F1F9;&#x1F1F4; Tonga (+676)</option>
            <option data-country-code="TT" value="1868">&#x1F1F9;&#x1F1F9; Trinidad &amp; Tobago (+1868)</option>
            <option data-country-code="TN" value="216">&#x1F1F9;&#x1F1F3; Tunisia (+216)</option>
            <option data-country-code="TR" value="90">&#x1F1F9;&#x1F1F7; Turkey (+90)</option>
            <option data-country-code="TM" value="993">&#x1F1F9;&#x1F1F2; Turkmenistan (+993)</option>
            <option data-country-code="TC" value="1649">&#x1F1F9;&#x1F1E8; Turks &amp; Caicos Islands (+1649)</option>
            <option data-country-code="TV" value="688">&#x1F1F9;&#x1F1FB; Tuvalu (+688)</option>
            <option data-country-code="UG" value="256">&#x1F1FA;&#x1F1EC; Uganda (+256)</option>
            <option data-country-code="UA" value="380">&#x1F1FA;&#x1F1E6; Ukraine (+380)</option>
            <option data-country-code="AE" value="971">&#x1F1E6;&#x1F1EA; United Arab Emirates (+971)</option>
            <option data-country-code="GB" value="44">&#x1F1EC;&#x1F1E7; United Kingdom (+44)</option>
            <option data-country-code="US" value="1">&#x1F1FA;&#x1F1F8; United States of America (+1)</option>
            <option data-country-code="UY" value="598">&#x1F1FA;&#x1F1FE; Uruguay (+598)</option>
            <option data-country-code="UZ" value="998">&#x1F1FA;&#x1F1FF; Uzbekistan (+998)</option>
            <option data-country-code="VU" value="678">&#x1F1FB;&#x1F1FA; Vanuatu (+678)</option>
            <option data-country-code="VA" value="39">&#x1F1FB;&#x1F1E6; Vatican City (+39)</option>
            <option data-country-code="VE" value="58">&#x1F1FB;&#x1F1EA; Venezuela (+58)</option>
            <option data-country-code="VN" value="84">&#x1F1FB;&#x1F1F3; Vietnam (+84)</option>
            <option data-country-code="VG" value="1284">&#x1F1FB;&#x1F1EC; Virgin Islands - British (+1284)</option>
            <option data-country-code="VI" value="1340">&#x1F1FB;&#x1F1EE; Virgin Islands - US (+1340)</option>
            <option data-country-code="WF" value="681">&#x1F1FC;&#x1F1EB; Wallis &amp; Futuna (+681)</option>
            <option data-country-code="EH" value="967">&#x1F1EA;&#x1F1ED; Western Sahara (+212)</option>
            <option data-country-code="YE" value="967">&#x1F1FE;&#x1F1EA; Yemen (+967)</option>
            <option data-country-code="ZM" value="260">&#x1F1FF;&#x1F1F2; Zambia (+260)</option>
            <option data-country-code="ZW" value="263">&#x1F1FF;&#x1F1FC; Zimbabwe (+263)</option>
        </Select>
    </>
  )
}

export default CountryPhoneList