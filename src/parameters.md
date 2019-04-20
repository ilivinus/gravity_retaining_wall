<Modal isOpen={this.state.modal1} toggle={()=>this.toggle('modal1')} className={styles.modalWidth} >
                        <ModalHeader toggle={()=>this.toggle('modal1')}>Parameter Definitions</ModalHeader>
                        <ModalBody>                            
                            <ul>
                                <li>q = surcharge</li>
                                <li>a = top width of stem</li>
                                <li>b = c = thickness of base slab</li>
                                <li>d = toe length</li>
                                <li>B = Base width</li>
                                <li>e = heel length</li>
                                <li>P<sub>o</sub> = Concentrated load</li>
                                <li>&gamma;<sub>w</sub>= Unit weight of water</li>
                                <li>&gamma;<sub>sat</sub> = Saturated unit weight</li>
                                
                                <li>C' = Cohesion  value (KN/m2)</li>
                                <li>H = Total height of the wall</li>
                                <li>q<sub>u</sub> = ultimate bearing capacity (KN/m2)</li>
                                <li>&gamma;<sub>c</sub> = Unit weight of concrete</li>             
                                <li>&Phi;' = Angle of shearing resistance or soil friction (o)</li>
                                <li>&Phi; = &Phi;<sub>b</sub> = Angle of friction between the base of the wall and the foundation (o)</li>
                                <li>&gamma;  = The unit weight of the backfill or soil</li>                                
                                <li>&delta; = Angle of friction between the backface of the wall and the backfill or angle of wall friction (o)</li>
                                <li>F = (factor of safety against bearing capacity of the soil)</li>
                                <li>&beta; = Angle of inclination of the backfill with the horizontal base soil (o)</li>                                
                            </ul>
                        </ModalBody>
                    </Modal>
#The gravity wall proportions
a = Toe length of the wall (m)
c = Top thickness of the wall (m)
d = Heel length of the wall (m)
e = f = Base thickness of the wall (m)
B = Base width of the wall (m)
H = Total height of the wall(m)
B = Angle of inclination of the backfill with the horizontal  base soil
H = Total height of the wall (m)
B = Angle of inclination of the backfill with the horizontal base soil (o)

# The backfill / Data
Q' = Angle of shearing resistance or soil friction (o)
C' = Cohesion  value (KN/m2)
r  = The unit weight of the backfill or soil
qu = ultimate bearing capacity (KN/m2)
Q = Angle of friction between the base of the wall and the foundation (o)

#Concrete / General Data
rc = the unit weight of concrete (KN/m3)
$ = Angle of friction between the backface of the wall and the backfill or angle of
wall friction (o)
F = Z (factor of safety against bearing capacity of the soil)
a = Angle of inclination of the backface of the wall with the horizontal (o)
Hp = depth of soil in front of the wall (m)

#Diplayed parameter
Ka = active earth pressure coefficient
Pa = active force (KN)
Ha = Sum of height of the wall and height of inclined backfill (m)
Ph = Horizontal component of active force (KN)
Pv = Vertical component of active force (KN)
SumPh = Total force causing sliding (KN)
SumPr = Total force resisting sliding (KN)
X = Lever arm (m)
e = Eccentricity (m)
Pmax = maximum base pressure (KN/m2)
Pmin = minimum base pressure (KN/m2)
Fs = Factor of safety against sliding
emax = Maximum eccentricity(m)
SumM = Summation of the total moment
Pp = Passive pressure(KN)
Kp = Passive earth pressure coefficient

Sheet pill wall proportions
rsat = Saturated unit weight
rw = unit weight of water
r = unit weight of soil
c1, c2, c3 = Cohension values of first, second and third layers  respectively.
Q1, Q2, Q3 = Angle of soil friction of first, second and third layers respectively.
Z1, Z2 = depth of first and second layer respectively.
z0 = depth of the rod below the surface of the backfill
D = depth of embedment of the pile
F = z (factor of safety with respect to passive resistance)
T = force in each tie rod
Far = The anchor rod force
q = effective overburden pressure

Retaining Wall proportion
q = surcharge
a = top width of stem
b = c = thickness of base slab
d = toe length
B = Base width
e = heel length
Po = Concentrated load
Qb = Q = Angle of friction between the base of the wall and the foundation

rw = unit weight of water
rsat = saturated unit weight
