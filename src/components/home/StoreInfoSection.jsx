import React, { useState } from 'react';
import { MapPin, Phone, Clock, Car, Calendar, Users, CheckCircle, ExternalLink } from 'lucide-react';

export default function StoreInfoSection() {
  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    date: '',
    time: '18:00',
    guests: '2',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reservation"
      className="section-padding"
      style={{
        background: 'var(--bg-subtle)',
        position: 'relative'
      }}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '1rem' }}>
            <MapPin size={14} />
            <span>VISIT & RESERVATION</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em'
            }}
          >
            소중한 분과의 미식, <span className="text-gold-gradient">금등어에서 모십니다</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            쾌적한 메인 홀과 프라이빗 룸(4인~20인)이 완비되어 있습니다. 단체 예약 및 주말 방문 시 사전 예약을 권장합니다.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Store Details Card */}
          <div
            className="glass-panel"
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              들안길 본점 안내
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} color="var(--gold-dark)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>주소</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>대구광역시 수성구 들안로 (들안길 맛집타운 중심가)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={20} color="var(--gold-dark)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>영업 시간</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                    매일 11:00 ~ 21:30 (라스트오더 20:40)<br />
                    브레이크타임 15:30 ~ 17:00 (주말/공휴일 브레이크타임 없음)
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Car size={20} color="var(--gold-dark)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>주차 및 발렛</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                    매장 전용 대형 주차장 완비 (50대 동시 주차 가능, 발렛 파킹 무료 지원)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick External Booking Buttons */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>
                플랫폼 바로 예약
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <a
                  href="https://pf.kakao.com/_xgjxjxgG"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#FEE500',
                    color: '#191919',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>카카오톡 채널 예약</span>
                  <ExternalLink size={14} />
                </a>
                <a
                  href="https://map.naver.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#03C75A',
                    color: '#FFFFFF',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>네이버 지도 / 예약</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Booking Form */}
          <div
            className="glass-panel"
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              온라인 간편 예약 신청
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              예약 접수 후 매장에서 30분 이내에 확정 문자를 발송해 드립니다.
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--gold-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}
                >
                  <CheckCircle size={32} color="#191614" />
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  예약 신청이 접수되었습니다!
                </h4>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {reservation.name} 고객님 ({reservation.phone})<br />
                  예약 일시: {reservation.date || '지정일'} {reservation.time} ({reservation.guests}인)
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}
                >
                  추가 예약하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      예약자 성함 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={reservation.name}
                      onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={reservation.phone}
                      onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      예약일자 *
                    </label>
                    <input
                      type="date"
                      required
                      value={reservation.date}
                      onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      방문시간 *
                    </label>
                    <select
                      value={reservation.time}
                      onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="11:30">11:30</option>
                      <option value="12:30">12:30</option>
                      <option value="13:30">13:30</option>
                      <option value="17:30">17:30</option>
                      <option value="18:30">18:30</option>
                      <option value="19:30">19:30</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      인원수 *
                    </label>
                    <select
                      value={reservation.guests}
                      onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.875rem'
                      }}
                    >
                      <option value="2">2인</option>
                      <option value="3">3인</option>
                      <option value="4">4인 (테이블)</option>
                      <option value="6">6인 (룸)</option>
                      <option value="8">8인 이상 (대형 룸)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                    요청사항 (창가석, 유아용 의자, 룸 요청 등)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="특별한 요청사항이 있으시면 적어주세요."
                    value={reservation.notes}
                    onChange={(e) => setReservation({ ...reservation, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginTop: '0.5rem'
                  }}
                >
                  <Calendar size={18} />
                  <span>들안길 본점 예약 신청하기</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
